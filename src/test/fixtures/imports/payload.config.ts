import { buildConfig } from 'payload/config'
import { Posts } from './Posts'
import { Navigation } from './Navigation'

export default buildConfig({
  collections: [Posts],
  globals: [Navigation],
})
