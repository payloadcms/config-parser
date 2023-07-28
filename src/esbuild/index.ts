import * as esbuild from 'esbuild'
import { serverPlugin } from './serverPlugin'

const plugins = {
  server: serverPlugin,
}

export const esbuildParser = async (entry: string, target: 'admin' | 'server') => {
  const options: esbuild.BuildOptions = {
    entryPoints: [entry],
    bundle: true,
    platform: target === 'server' ? 'node' : undefined,
    target: ['node16.20'],
    packages: 'external',
    outfile: `./.payload/${target}.config.js`,
    plugins: [plugins[target]],
  }

  await esbuild.build(options)
}
