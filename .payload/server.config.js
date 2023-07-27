var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// payload.config.ts
var payload_config_exports = {};
__export(payload_config_exports, {
  default: () => payload_config_default
});
module.exports = __toCommonJS(payload_config_exports);
var import_config = require("payload/config");

// Posts.ts
var Posts = {
  slug: "posts",
  hooks: {
    afterRead: [
      () => {
        console.log("post being read");
      }
    ]
  },
  fields: [
    {
      name: "title",
      type: "text"
    }
  ]
};

// Global.ts
var import_fs = __toESM(require("fs"));
var PluginGlobal = {
  slug: "plugin-global",
  hooks: {
    afterRead: [
      () => {
        console.log("plugin global read");
        console.log(import_fs.default);
      }
    ]
  },
  fields: [
    {
      name: "title",
      type: "text"
    }
  ]
};

// samplePlugin.ts
var samplePlugin = (config) => ({
  ...config,
  globals: [
    PluginGlobal
  ]
});

// getMediaCollection.ts
var getMediaCollection = (slug) => {
  return {
    slug,
    upload: true,
    fields: [
      {
        name: "alt",
        type: "text"
      }
    ]
  };
};

// payload.config.ts
var payload_config_default = (0, import_config.buildConfig)({
  collections: [
    getMediaCollection("media"),
    {
      slug: "pages",
      access: {
        read: () => true
      },
      hooks: {
        afterRead: [
          () => {
            console.log("read");
          }
        ]
      },
      fields: [
        {
          name: "title",
          type: "text"
        }
      ]
    },
    Posts
  ],
  plugins: [
    samplePlugin
  ]
});
