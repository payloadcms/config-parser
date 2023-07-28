import path from 'path'
import * as swc from '@swc/core'

// This is a straight up tragedy, 
// the swc bundler method is not fully functional
export const swcParser = async (entry: string) => {
  // @ts-expect-error
  const code = await swc.bundle({
    // workingDir: path.resolve(__dirname, '../'),
    entry: {
      server: entry,
    },
    output: {
      path: path.resolve(__dirname, '../.payload/server.config.js')
    },
    options: {
      // env: {
      //   exclude: [
      //     'crypto',
      //     'payload',
      //   ],
      // },
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        target: 'es5',
      },
      module: {
        type: 'commonjs'
      },
    },
    target: 'node',
    // ignore: [
    //   /.*\/node_modules\/.*/, // parse everything besides files within node_modules
    // ],
    // externalModules: [
    //   'pnpapi',
    //   '@webassemblyjs/ast',
    //   '@webassemblyjs/wasm-edit',
    //   '@webassemblyjs/wasm-parser',
    //   'uglify-js/package.json',
    //   'bufferutil',
    //   'utf-8-validate',
    //   './swc.android-arm64.node',
    //   '@swc/core-android-arm64',
    //   './swc.android-arm-eabi.node',
    //   '@swc/core-android-arm-eabi',
    //   './swc.win32-x64-msvc.node',
    //   '@swc/core-win32-x64-msvc',
    //   './swc.win32-ia32-msvc.node',
    //   '@swc/core-win32-ia32-msvc',
    //   './swc.win32-arm64-msvc.node',
    //   '@swc/core-win32-arm64-msvc',
    //   './swc.darwin-x64.node',
    //   '@swc/core-darwin-x64',
    //   './swc.darwin-arm64.node',
    //   './swc.freebsd-x64.node',
    //   '@swc/core-freebsd-x64',
    //   './swc.linux-x64-musl.node',
    //   '@swc/core-linux-x64-musl',
    //   './swc.linux-x64-gnu.node',
    //   '@swc/core-linux-x64-gnu',
    //   './swc.linux-arm64-musl.node',
    //   '@swc/core-linux-arm64-musl',
    //   '@swc/wasm',
    //   'uglify-js',
    //   'path',
    //   'util',
    //   'fs',
    //   'payload',
    //   'crypto',
    //   'node_modules'
    // ]
  })

  console.log(code)
}

