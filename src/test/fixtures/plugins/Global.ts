import { GlobalConfig } from "payload/dist/globals/config/types";
import fs from 'fs'

export const PluginGlobal: GlobalConfig = {
  slug: 'plugin-global',
  hooks: {
    afterRead: [
      () => {
        console.log('plugin global read')
        console.log(fs)
      }
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    }
  ]
}