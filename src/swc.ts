import path from 'path'
import * as swc from '@swc/core'

// This is a straight up tragedy, 
// the swc bundler method is not fully functional
export const swcParser = async (entry: string) => {
  // @ts-expect-error
  const code = await swc.bundle({
    workingDir: path.resolve(__dirname, '../'),
    entry: {
      server: entry,
    },
    output: {
      path: path.resolve(__dirname, '../.payload/server.config.js')
    },
    options: {
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
    }
  })

  console.log(code)
}

