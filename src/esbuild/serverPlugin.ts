import * as esbuild from 'esbuild'
import { getTsconfig as getTSconfig } from 'get-tsconfig'
import * as ts from 'typescript'
import { pruneProperties, PruneOptions } from '../shared'

const tsConfig = getTSconfig()

export const prunePlugin: esbuild.Plugin = {
  name: 'payload-prune',
  setup(build) {
    const platform = build.initialOptions.platform === 'browser' ? 'browser' : 'node'
    const options = pruneProperties[platform === 'browser' ? 'admin' : 'server']
    build.onLoad({ filter: /\.(t|j)sx?$/ }, (args) => {
      // This function should be called ONCE for every single file that gets loaded
      // For each file, we need to traverse through and look for config modifications
      const program = ts.createProgram(
        [args.path],
        tsConfig.config.compilerOptions as unknown as ts.CompilerOptions,
      )

      const payloadConfig = program.getSourceFile(args.path)
      // TODO: REMOVE debuild transformer for actual usage, it's here just for letting the tests pass
      // const { transformed } = ts.transform(payloadConfig, [transfomer(options)])
      const { transformed } = ts.transform(payloadConfig, [transfomer(options), debuild])
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

      return {
        contents: printer.printFile(transformed[0]),
        loader: 'ts',
      }
    })
  },
}

const transfomer = (prune: PruneOptions) => (context: ts.TransformationContext) => {
  // Handle toplevel
  return (node) => ts.visitEachChild(node, visitToplevel, context)

  // Visit the toplevel statements
  // export default buildConfig({})
  // export default {}
  // export const Posts = {}
  function visitToplevel(node: ts.Node) {
    // export default buildConfig({})
    if (ts.isExportAssignment(node) && node.expression?.expression?.escapedText === 'buildConfig') {
      // console.log('top.default')
      return ts.visitEachChild(node, visitBuildConfigCallExpression, context)
    }

    // This is not working
    // export default {}
    if (ts.isExportAssignment(node) && ts.isLiteralExpression(node.expression)) {
      // console.log('top.named', ts.SyntaxKind[node.kind], ts.SyntaxKind[node.expression?.kind])
      return ts.visitEachChild(node, visitConfigLiteral, context)
    }

    // Also consider patterns that can be deeply nested
    return visitDeep(node)
  }

  // Detect patterns in potentially deeply nested code
  function visitDeep(node: ts.Node) {
    // Detect objects that contain collections
    if (node.name?.escapedText === 'collections') {
      // console.log('deep.collections')
      return ts.visitEachChild(node, visitCollectionsLiteral, context)
    }

    // Detect objects that contain globals
    if (node.name?.escapedText === 'globals') {
      // console.log('deep.globals')
      return ts.visitEachChild(node, visitCollectionsLiteral, context)
    }

    // Detect objects that look like a collection
    // { slug, fields, ... }
    if (ts.isObjectLiteralExpression(node) && prune.collection.length) {
      const props = node.properties.map((p) => p.name.escapedText)
      if (props.includes('slug') && props.includes('fields')) {
        // console.log('deep.collection')
        return visitCollectionLiteral(node)
      }
    }

    // Hint for debugging
    // console.log(
    //   'deep',
    //   ts.isStatement(node),
    //   ts.SyntaxKind[node.kind],
    //   ts.SyntaxKind[node.expression?.kind],
    //   node.symbol?.escapedName,
    //   node.escapedText,
    //   node.name?.escapedText,
    // )

    return ts.visitEachChild(node, visitDeep, context)
  }

  // The buildConfig() call
  // buildConfig({ collections, globals, ... })
  function visitBuildConfigCallExpression(node: ts.Node) {
    return ts.visitEachChild(node, visitBuildConfigArgument, context)
  }

  function visitBuildConfigArgument(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      return ts.visitEachChild(node, visitConfigLiteral, context)
    }
    return node
  }

  // The config object
  // { collections, globals, ... }
  function visitConfigLiteral(node: ts.Node) {
    if (node.name?.escapedText === 'collections') {
      return ts.visitEachChild(node, visitCollectionsLiteral, context)
    }
    return node
  }

  // Array of collection objects
  // [{ slug, fields, ... }]
  function visitCollectionsLiteral(node: ts.Node) {
    if (ts.SyntaxKind[node.kind] === 'ArrayLiteralExpression') {
      return ts.visitEachChild(node, visitCollectionLiteral, context)
    }
    // TODO: Add support for [].map()
    return node
  }

  // One collection object
  // { slug, fields, ... }
  function visitCollectionLiteral(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const propertiesWithoutHooks = node.properties.filter(
        (property) =>
          ts.isPropertyAssignment(property) &&
          !prune.collection.includes(property.name.escapedText),
      )
      return ts.factory.createObjectLiteralExpression(propertiesWithoutHooks)
    }
    return node
  }
}

// Replace buildConfig() with noop for testing purposes
// Don't use in production
const debuild = (context: ts.TransformationContext) => {
  return (node) => ts.visitEachChild(node, visit, context)

  function visit(node: ts.Node, level = 0) {
    if (ts.isImportDeclaration(node)) level += 100
    // if (level < 100)
    //   console.log(
    //     '  '.repeat(level),
    //     ts.SyntaxKind[node.kind],
    //     ts.isExportAssignment(node),
    //     node.symbol?.escapedName,
    //     node.escapedText,
    //     node.name?.escapedText,
    //   )
    if (ts.isCallExpression(node) && node.expression.escapedText === 'buildConfig') {
      return node.arguments[0]
    }
    return ts.visitEachChild(node, (x) => visit(x, level + 1), context)
  }
}

// Logs the AST
//
// e.g.
// ExportAssignment
// ObjectLiteralExpression
//   PropertyAssignment collections
//     Identifier collections
//     ArrayLiteralExpression
//       Identifier Posts
//   PropertyAssignment globals
//     Identifier globals
//     ArrayLiteralExpression
//       Identifier Navigation
const logAST = (context: ts.TransformationContext) => {
  return (node) => ts.visitEachChild(node, visit, context)

  function visit(node: ts.Node, level = 0) {
    if (ts.isImportDeclaration(node)) level += 100
    if (level < 100)
      console.log(
        '  '.repeat(level),
        ts.SyntaxKind[node.kind],
        node.symbol?.escapedName || node.escapedText || node.name?.escapedText || '',
      )
    return ts.visitEachChild(node, (x) => visit(x, level + 1), context)
  }
}
