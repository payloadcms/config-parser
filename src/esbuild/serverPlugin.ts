import * as esbuild from 'esbuild'
import { getTsconfig as getTSconfig } from 'get-tsconfig'
import * as ts from 'typescript'
import util from 'util'

const tsConfig = getTSconfig()

export const serverPlugin: esbuild.Plugin = {
  name: 'payload-server',
  setup(build) {
    build.onLoad({ filter: /\.(t|j)sx?$/ }, (args) => {
      // This function should be called ONCE for every single file that gets loaded
      // For each file, we need to traverse through and look for config modifications
      const program = ts.createProgram(
        [args.path],
        tsConfig.config.compilerOptions as unknown as ts.CompilerOptions
      )

      const payloadConfig = program.getSourceFile(args.path)
      const checker = program.getTypeChecker() // Removing this line causes an esbuild error?

      ts.forEachChild(payloadConfig, (node) => {
        if (ts.isExportAssignment(node)) {
          // TODO: Use ts.visitNode in order to actually modify the AST?
          ts.forEachChild(node, visitNode)
        }
      })

      // TODO: Use printer to print new AST/source to file afte properly modifying it.

      // const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
      // const result = printer.printFile(payloadConfig)
      // Writing original source for now
      return {
        contents: payloadConfig.text,
        loader: 'ts',
      }
    })
  },
}

function visitNode(node: ts.Node) {
  // Properties are identifiers
  if (ts.isIdentifier(node)) {
    const propName = node.getText()
    switch (propName) {
      case 'hooks':
        console.log(`Visiting config prop: ${propName}`)
        break
      default:
        break
    }
  }

  ts.forEachChild(node, visitNode)
}

function debug(obj: any) {
  console.log(util.inspect(obj, false, null, true /* enable colors */))
}
