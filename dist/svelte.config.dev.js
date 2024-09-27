"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _adapterVercel = _interopRequireDefault(require("@sveltejs/adapter-vercel"));

var _vitePluginSvelte = require("@sveltejs/vite-plugin-svelte");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** @type {import('@sveltejs/kit').Config} */
var config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [(0, _vitePluginSvelte.vitePreprocess)({})],
  kit: {
    // adapter-auto only supports some environments, see
    // https://kit.svelte.dev/docs/adapter-auto for a list. If your
    // environment is not supported or you settled on a specific
    // environment, switch out the adapter. See
    // https://kit.svelte.dev/docs/adapters for more information about
    // adapters.
    adapter: (0, _adapterVercel["default"])({
      runtime: 'nodejs20.x'
    }),
    alias: {
      $types: './types'
    }
  }
};
var _default = config;
exports["default"] = _default;