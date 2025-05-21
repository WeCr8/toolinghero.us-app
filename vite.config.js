"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vite_1 = require("vite");
const plugin_vue_1 = __importDefault(require("@vitejs/plugin-vue"));
const plugin_vue_jsx_1 = __importDefault(require("@vitejs/plugin-vue-jsx"));
const vite_plugin_vue_devtools_1 = __importDefault(require("vite-plugin-vue-devtools"));
const vite_plugin_nightwatch_1 = __importDefault(require("vite-plugin-nightwatch"));
const vite_plugin_inspect_1 = __importDefault(require("vite-plugin-inspect"));
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_vue_1.default)(), (0, plugin_vue_jsx_1.default)(), (0, vite_plugin_vue_devtools_1.default)(), (0, vite_plugin_nightwatch_1.default)(), (0, vite_plugin_inspect_1.default)()],
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, './src'), // ✅ Alias works without import.meta
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
