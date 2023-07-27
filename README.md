# Payload Config Parser

The goal of this repository is to determine a way to split a source Payload config into two separate configs - one for server use and one for admin use.

The server-only config should maintain only config properties that are relevant for server contexts - i.e. no `admin` properties and similar.

The admin-only config should remove any server-side code such as access control, hooks, endpoints, and similar.

Once these properties are removed from their respective configs, all unused imports should also be removed, and the result should be bundled into a single file and either written to `./.payload/server.config.js` or `./.payload/admin.config.js`.

### Within this repo

We've stubbed out a `payload.config.ts` within this repo that showcases a few different structures that we will need to recurse through, in order to remove irrelevant config properties from their respective config targets.

- Collections written directly into `payload.config.ts`
- Collection in a separate file
- Function that returns a collection
- Plugin that injects a Global collection from a separate file
- Plugin from `node_modules` (@payloadcms/plugin-stripe) which imports server-only code

### Purpose

1. Right now, Payload requires you to use Webpack "aliases" to eliminate server-side code from appearing in your admin bundle, but if we can create an admin-specific version of the config, that requirement would become unnecessary.
1. The Payload server bundle size will become significantly smaller, because no client-side dependencies will be loaded such as React, custom components, etc.
1. The Payload admin bundle will also become smaller, and potentially more secure, due to eliminating any server-side code from appearing in the bundle.

### Things to solve

**Recursive Iteration**

We need to recursively iterate through all required files that are referenced within the `export default buildConfig({})` from the Payload config

**Bundling**

We need to bundle all dependencies of both server and client Payload configs into a single config file. This is because the location of files that contain Payload fields, collections, and globals is unknown and depends on the project.

For example, plugins themselves need to be recursed into and pruned very delicately. As a plugin is responsible for returning a config at the end of the day, we need to make sure to start by identifying the plugin function's return result, and then traverse the properties of that object.

### Current thinking

**Which parser do we use?**

There are many AST parsers out there. TypeScript itself has the ability to parse files to AST. But we need to choose wisely here.

**We need a bundler just as much as we need a parser**

Parsing to AST and then looping over AST nodes is relatively easy. The hard part will be determining how to bundle all dependencies together after all files are recursively pruned.

**We already use swc**

Payload already leverages `swc` internally, and it would be ideal to keep our dependencies to a minimum.

**We probably need to write a bundler plugin**

Bundlers like `esbuild`, `webpack`, and `swc` support plugins natively, and they are set up to do this type of thing. We will probably end up building a plugin for whichever bundler we decide to leverage.
