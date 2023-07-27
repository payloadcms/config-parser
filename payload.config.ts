import { buildConfig } from 'payload/config';
import { Posts } from './Posts';
import { samplePlugin } from './samplePlugin';
import { getMediaCollection } from './getMediaCollection';

export default buildConfig({
  collections: [
    getMediaCollection('media'),
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
