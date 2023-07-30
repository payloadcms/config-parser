import type { Plugin } from "payload/config";
import { PluginGlobal } from "./Global";

export const samplePlugin: Plugin = (config) => ({
  ...config,
  collections: (config.collections || []).map((coll) => ({
    ...coll,
    hooks: {
      ...coll.hooks || {},
      afterRead: [
        ...coll.hooks?.afterRead || [],
        () => { }
      ],
    },
  })),
  globals: [
    PluginGlobal
  ]
})