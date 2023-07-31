import { resolve } from 'node:path'
import { JscConfig, bundle, transform } from '@swc/core'
import { mkdirSync, writeFileSync } from 'node:fs'
import { pruneProperties } from './shared'

export const swcBuildAll = async (entry: string, outDir = './.payload') => {
  return Promise.all([swcParser(entry, 'server', outDir), swcParser(entry, 'admin', outDir)])
}

// This is a straight up tragedy,
// the swc bundler method is not fully functional
export const swcParser = async (
  entry: string,
  target: 'admin' | 'server',
  outDir = './.payload',
) => {
  const jsc: JscConfig = {
    parser: {
      syntax: 'typescript',
      tsx: true,
      dynamicImport: true,
    },
    // Based on https://github.com/tsconfig/bases/blob/main/bases/node16.json
    target: 'es2021',
  }
  const code = await bundle({
    // workingDir: path.resolve(__dirname, '../'),
    entry: { entry },
    output: {
      path: resolve(entry, '..', outDir, `./${target}.config.js`),
      name: target,
    },
    module: {},
    options: {
      // env: {
      //   exclude: [
      //     'crypto',
      //     'payload',
      //   ],
      // },
      jsc,
      module: {
        type: target === 'admin' ? 'commonjs' : 'es6',
      },
    },
    target: 'node',
    // ignore: [
    //   /.*\/node_modules\/.*/, // parse everything besides files within node_modules
    // ],
    externalModules: ['payload/config', '@payloadcms/plugin-stripe'],
  })
  await mkdirSync(resolve(entry, '..', outDir), { recursive: true })
  // await writeFileSync(resolve(entry, '..', outDir, `./${target}.bundled.js`), code.entry.code)

  const prune = pruneProperties[target]
  const pruned = await transform(code.entry.code, {
    plugin: visit,
    inputSourceMap: code.entry.map,
    sourceMaps: true,
    jsc,
  })

  // Write to file
  await writeFileSync(resolve(entry, '..', outDir, `./${target}.config.js`), pruned.code)

  // Function to visit all nodes in SWC AST
  function visit(node, level = 0) {
    // if (node.type)
    //   console.log(
    //     '  '.repeat(level),
    //     (typeof node.value === 'string' ? '-->' + node.value : '') || node.type,
    //   )
    // else level--

    // Prune collection object literal
    if (
      node.type === 'ObjectExpression' &&
      hasProperty(node, 'slug') &&
      hasProperty(node, 'fields')
    ) {
      node.properties = node.properties.filter((prop) => !prune.collection.includes(prop.key.value))
    }

    // Testing purposes: remove buildConfig
    if (node.type === 'CallExpression' && node.callee.value === 'buildConfig') {
      return visit(node.arguments[0].expression, level)
    }

    // Based on quick search
    if (node.arguments) replaceAll(node, 'arguments', level)
    if (node.body && level === 0) replaceAll(node, 'body', level)
    if (node.declarations) replaceAll(node, 'declarations', level)
    if (node.decorators) replaceAll(node, 'decorators', level)
    if (node.elements) replaceAll(node, 'elements', level)
    if (node.members) replaceAll(node, 'members', level)
    if (node.params) replaceAll(node, 'params', level)
    if (node.properties) replaceAll(node, 'properties', level)
    if (node.specifiers) replaceAll(node, 'specifiers', level)
    if (node.stmts) replaceAll(node, 'stmts', level)
    if (node.types) replaceAll(node, 'types', level)

    if (node.value && typeof node.value !== 'string') node.value = visit(node.value, level + 1)
    if (node.init) node.init = visit(node.init, level + 1)
    if (node.callee) node.callee = visit(node.callee, level + 1)
    if (node.expression) node.expression = visit(node.expression, level + 1)
    if (node.key) node.key = visit(node.key, level + 1)

    // gpt
    if (node.expressions) node.expressions = replaceAll(node, 'expressions', level)
    if (node.cases) node.cases = replaceAll(node, 'cases', level)

    return node
  }

  // Array variant

  function replaceAll(node, property, level = 0) {
    if (!node[property]) return console.log('prop', property, 'not found on', node.type)
    if (typeof node[property].map !== 'function')
      return console.log('prop', property, 'not function on', node.type)
    node[property] = node[property].map((node) => visit(node, level + 1))
    return node
  }
}

// Generic helpers

function hasProperty(node, property) {
  if (!node.properties) return false
  return node.properties.some((prop) => prop.key.value === property)
}
