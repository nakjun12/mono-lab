import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3000
  },
  dev: {
    assetPrefix: true
  },
  tools: {
    rspack: {
      output: {
        uniqueName: "rsbuild_react_18_host"
      },
      plugins: [
        new ModuleFederationPlugin({
          name: "rsbuild_react_18_host",
          exposes: {
            "./button": "./src/button.tsx"
          },
          remotes: {
            rsbuild_react_18_remote:
              "rsbuild_react_18_remote@http://localhost:4000/mf-manifest.json"
          },
          shared: ["react", "react-dom"]
        })
      ]
    }
  }
});
