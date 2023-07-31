import { describe, expect, it } from 'vitest'
import { swcBuildAll } from '../swc'
import { loadAdmin, loadServer } from './shared'

describe('swc', () => {
  it('builds inline', async () => {
    // Build
    await swcBuildAll(__dirname + '/fixtures/inline/payload.config.ts', __dirname + '/swc/inline')

    // Verify admin
    const admin = await loadAdmin('swc/inline')
    expect(admin.collections[0].hooks).toBeUndefined()
    expect(admin.collections[0].access).toBeUndefined()
    expect(admin.collections[0].endpoints).toBeUndefined()

    // Verify server
    const server = await loadServer('swc/inline')
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
    await swcBuildAll(__dirname + '/fixtures/imports/payload.config.ts', __dirname + '/swc/imports')

    // Verify admin
    const admin = await loadAdmin('swc/imports')
    expect(admin.collections[0].hooks).toBeUndefined()
    expect(admin.collections[0].access).toBeUndefined()
    expect(admin.collections[0].endpoints).toBeUndefined()
    expect(admin.globals[0].hooks).toBeUndefined()
    expect(admin.globals[0].access).toBeUndefined()
    expect(admin.globals[0].endpoints).toBeUndefined()

    // Verify server
    const server = await loadServer('swc/imports')
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
