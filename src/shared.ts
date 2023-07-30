export type PruneOptions = {
  config: string[]
  collection: string[]
  global: string[]
}
export const pruneProperties: Record<'admin' | 'server', PruneOptions> = {
  admin: {
    // TODO
    config: ['hooks', 'access', 'endpoints'],
    collection: ['hooks', 'access', 'endpoints'],
    // TODO
    global: ['hooks', 'access', 'endpoints'],
  },
  server: {
    config: [],
    collection: [],
    global: [],
  },
}
