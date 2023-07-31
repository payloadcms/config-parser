const getMediaCollection = (slug)=>{
    return {
        slug,
        upload: true,
        fields: [
            {
                name: 'alt',
                type: 'text'
            }
        ]
    };
};
import { buildConfig } from 'payload/config';
const __default = buildConfig({
    collections: [
        getMediaCollection('media')
    ]
});
export { __default as default };
