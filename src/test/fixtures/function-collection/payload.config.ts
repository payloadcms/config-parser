import { buildConfig } from 'payload/config'
import { getMediaCollection } from './getMediaCollection'

export default buildConfig({
  collections: [getMediaCollection('media')],
})
