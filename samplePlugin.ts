import { Plugin } from "payload/config";
import { PluginGlobal } from "./Global";

export const samplePlugin: Plugin = (config) => ({
  ...config,
  globals: [
    PluginGlobal
  ]
})