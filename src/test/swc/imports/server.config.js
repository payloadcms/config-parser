const Posts = {
    slug: 'posts',
    hooks: {
        afterRead: [
            ()=>{
                console.log('post being read');
            }
        ]
    },
    fields: [
        {
            name: 'title',
            type: 'text'
        }
    ]
};
const Navigation = {
    slug: 'navigation',
    hooks: {
        afterRead: [
            ()=>{
                console.log('nav being read');
            }
        ]
    },
    fields: [
        {
            name: 'title',
            type: 'text'
        }
    ]
};
const __default = {
    collections: [
        Posts
    ],
    globals: [
        Navigation
    ]
};
export { __default as default };
