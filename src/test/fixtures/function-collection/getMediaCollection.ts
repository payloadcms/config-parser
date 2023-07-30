import { CollectionConfig } from "payload/dist/collections/config/types"

export const getMediaCollection = (slug: string): CollectionConfig => {
  return {
    slug,
    upload: true,
    fields: [
      {
        name: 'alt',
        type: 'text',
      }
    ]
  }
}