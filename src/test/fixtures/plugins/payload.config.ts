import { buildConfig } from 'payload/config'
import { samplePlugin } from './samplePlugin'
import stripePlugin from '@payloadcms/plugin-stripe'

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
    },
  ],
  plugins: [
    samplePlugin,
    stripePlugin({
      stripeSecretKey: '',
      isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
      stripeWebhooksEndpointSecret: '',
    }),
  ],
})
