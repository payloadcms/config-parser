// src/test/fixtures/imports/Posts.ts
var Posts = { slug: "posts", fields: [
  {
    name: "title",
    type: "text"
  }
] };

// src/test/fixtures/imports/Navigation.ts
var Navigation = { slug: "navigation", fields: [
  {
    name: "title",
    type: "text"
  }
] };

// src/test/fixtures/imports/payload.config.ts
var payload_config_default = {
  collections: [Posts],
  globals: [Navigation]
};
export {
  payload_config_default as default
};
