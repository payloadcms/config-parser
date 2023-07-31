import { GlobalConfig } from 'payload/dist/globals/config/types'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  hooks: {
    afterRead: [
      () => {
        console.log('nav being read')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
