import * as ts from "typescript";

export const typescriptParser = async (entry: string, compilerOptions: ts.CompilerOptions): Promise<void> => {
  let program = ts.createProgram([entry], compilerOptions);

  const sourceFile = program.getSourceFile(entry);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // Loop through the root AST nodes of the file
  ts.forEachChild(sourceFile, node => {
    console.log({ node })
    // DO stuff
    // this function should be recursive and call itself for each required file
    // somehow adding the required file back upward into the main nodes
  });

  // Need to re-print the "cleaned up" nodes into the `./payload` folder at this point
  process.exit(1);
}
