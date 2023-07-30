import * as esbuild from 'esbuild'
import { prunePlugin } from './serverPlugin'
import { resolve } from 'path'

export const esbuildBuildAll = async (entry: string, outDir = './.payload') => {
  return Promise.all([
    esbuildParser(entry, 'server', outDir),
    esbuildParser(entry, 'admin', outDir),
  ])
}

export const esbuildParser = async (
  entry: string,
  target: 'admin' | 'server',
  outDir = './.payload',
) => {
  const options: esbuild.BuildOptions = {
    entryPoints: [entry],
    bundle: true,
    platform: target === 'server' ? 'node' : 'browser',
    // For testing, because iife is not importable in vitest
    format: target === 'server' ? 'cjs' : 'esm',
    target: ['node16.20'],
    // Consider browsers too?
    // target: ['es2020', 'chrome58', 'edge16', 'firefox57', 'node12', 'safari11'],
    packages: 'external',
    outfile: resolve(entry, '..', outDir, `./${target}.config.js`),
    plugins: [prunePlugin],
  }

  await esbuild.build(options)
}
