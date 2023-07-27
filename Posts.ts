import { CollectionConfig } from "payload/dist/collections/config/types";

export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    afterRead: [
      () => {
        console.log('post being read')
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