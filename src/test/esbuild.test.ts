import { describe, expect, it } from 'vitest'
import { esbuildBuildAll } from '../esbuild'
import { loadAdmin, loadServer } from './shared'

describe('esbuild', () => {
  it('builds inline', async () => {
    // Build
    await esbuildBuildAll(
      __dirname + '/fixtures/inline/payload.config.ts',
      __dirname + '/esbuild/inline',
    )

    // Verify admin
    const admin = await loadAdmin('esbuild/inline')
    expect(admin.collections[0].hooks).toBeUndefined()
    expect(admin.collections[0].access).toBeUndefined()
    expect(admin.collections[0].endpoints).toBeUndefined()

    // Verify server
    const server = await loadServer('esbuild/inline')
    expect(server.collections[0].hooks).toMatchInlineSnapshot(`
      {
        "afterRead": [
          [Function],
        ],
      }
    `)
    expect(server.collections[0].access).toMatchInlineSnapshot(`
      {
        "read": [Function],
      }
    `)
    expect(server.collections[0].endpoints).toMatchInlineSnapshot(`
      [
        {
          "handler": [Function],
          "method": "get",
          "path": "/html",
        },
      ]
    `)
  })

  it('builds imports', async () => {
    // Build
    await esbuildBuildAll(
      __dirname + '/fixtures/imports/payload.config.ts',
      __dirname + '/esbuild/imports',
    )

    // Verify admin
    const admin = await loadAdmin('esbuild/imports')
    expect(admin.collections[0].hooks).toBeUndefined()
    expect(admin.collections[0].access).toBeUndefined()
    expect(admin.collections[0].endpoints).toBeUndefined()
    expect(admin.globals[0].hooks).toBeUndefined()
    expect(admin.globals[0].access).toBeUndefined()
    expect(admin.globals[0].endpoints).toBeUndefined()

    // Verify server
    const server = await loadServer('esbuild/imports')
    expect(server.collections[0].hooks).toMatchInlineSnapshot(`
      {
        "afterRead": [
          [Function],
        ],
      }
    `)
    expect(server.collections[0].access).toMatchInlineSnapshot('undefined')
    expect(server.collections[0].endpoints).toMatchInlineSnapshot('undefined')
    expect(server.globals[0].hooks).toMatchInlineSnapshot(`
      {
        "afterRead": [
          [Function],
        ],
      }
    `)
    expect(server.globals[0].access).toMatchInlineSnapshot('undefined')
    expect(server.globals[0].endpoints).toMatchInlineSnapshot('undefined')

    // Load in browser?
  })

  // function CallExpression

  // Plugins
})
