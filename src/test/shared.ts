import { readdirSync } from 'node:fs'

export const expected = __dirname + '/expected'
export const actual = __dirname + '/actual'

export const fixtures = readdirSync(__dirname + '/fixtures', { withFileTypes: true }).filter(
  (dir) => dir.isDirectory(),
)
// .filter((dir) => dir.name === 'inline')

export const flatHooks = (hooks) => hooks && Object.values(hooks).flat()

// Dynamic imports may be cached
let i = 0
const id = () => i++

export const loadAdmin = (name: string) =>
  import(__dirname + '/' + name + '/admin.config.js?' + id()).then((m) => m.default)

export const loadServer = (name: string) =>
  import(__dirname + '/' + name + '/server.config.js?' + id())
    .then((m) => m.default)
    // Workaround for Vitest, this happens when target is node16.20
    .then((m) => (m.default ? m.default : m))
