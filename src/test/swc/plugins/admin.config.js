const PluginGlobal = {
    slug: 'plugin-global',
    fields: [
        {
            name: 'title',
            type: 'text'
        }
    ]
};
const samplePlugin = (config)=>({
        ...config,
        collections: (config.collections || []).map((coll)=>({
                ...coll,
                hooks: {
                    ...coll.hooks || {},
                    afterRead: [
                        ...coll.hooks?.afterRead || [],
                        ()=>{}
                    ]
                }
            })),
        globals: [
            PluginGlobal
        ]
    });
import { buildConfig } from 'payload/config';
import stripePlugin from '@payloadcms/plugin-stripe';
const __default = buildConfig({
    collections: [
        {
            slug: 'pages',
            fields: [
                {
                    name: 'title',
                    type: 'text'
                }
            ]
        }
    ],
    plugins: [
        samplePlugin,
        stripePlugin({
            stripeSecretKey: '',
            isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
            stripeWebhooksEndpointSecret: ''
        })
    ]
});
export { __default as default };
