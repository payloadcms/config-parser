var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/test/fixtures/inline/payload.config.ts
var payload_config_exports = {};
__export(payload_config_exports, {
  default: () => payload_config_default
});
module.exports = __toCommonJS(payload_config_exports);
var payload_config_default = {
  collections: [
    { slug: "pages", access: {
      read: () => true
    }, hooks: {
      afterRead: [
        () => {
          console.log("read");
        }
      ]
    }, fields: [
      {
        name: "title",
        type: "text"
      }
    ], endpoints: [
      {
        path: "/html",
        method: "get",
        handler: async (req, res) => {
          res.send("<!doctype html>");
        }
      }
    ] }
  ]
};
