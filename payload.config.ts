import { buildConfig } from 'payload/config';
import { Posts } from './Posts';
import { samplePlugin } from './samplePlugin';

export default buildConfig({
  collections: [
    {
      slug: 'pages',
      access: {
        read: () => true
      },
      hooks: {
        afterRead: [
          () => {
            console.log('read')
          }
        ]
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        }
      ]
    },
    Posts,
  ],
  plugins: [
    samplePlugin,
  ]
})