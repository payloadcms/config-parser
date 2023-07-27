import * as esbuild from 'esbuild'

export const esbuildParser = async (entry: string) => {
  await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    platform: 'node',
    target: ['node16.20'],
    packages: 'external',
    // external: [
    //   '@swc/wasm',
    //   '@swc/core',
    //   'uglify-js',
    //   'pnpapi',
    //   'payload'
    // ],
    outfile: './.payload/server.config.js',
  })
}