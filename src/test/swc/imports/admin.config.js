const Posts = {
    slug: 'posts',
    fields: [
        {
            name: 'title',
            type: 'text'
        }
    ]
};
const Navigation = {
    slug: 'navigation',
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
