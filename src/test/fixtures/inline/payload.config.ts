import { buildConfig } from 'payload/config'

export default buildConfig({
  collections: [
    {
      slug: 'pages',
      access: {
        read: () => true,
      },
      hooks: {
        afterRead: [
          () => {
            console.log('read')
          },
        ],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
      ],
      endpoints: [
        {
          path: '/html',
          method: 'get',
          handler: async (req, res) => {
            res.send('<!doctype html>')
          },
        },
      ],
    },
  ],
})
