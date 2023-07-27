import path from 'path'
import * as ts from "typescript";
import { getTsconfig as getTSconfig } from 'get-tsconfig';
import { parser } from "./parser";

const tsConfig = getTSconfig()

const configPath = path.resolve(__dirname, '../payload.config.ts')

parser(configPath, tsConfig.config.compilerOptions as unknown as ts.CompilerOptions)