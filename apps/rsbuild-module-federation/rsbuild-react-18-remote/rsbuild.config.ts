import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 4000
  },
  dev: {
    assetPrefix: true
  },
  tools: {
    rspack: {
      output: {
        uniqueName: "rsbuild_react_18_remote"
      },
      plugins: [
        new ModuleFederationPlugin({
          name: "rsbuild_react_18_remote",
          exposes: {
            "./button": "./src/button.tsx"
          },
          remotes: {
            rsbuild_react_18_host:
              "rsbuild_react_18_host@http://localhost:2000/mf-manifest.json"
          },
          shared: ["react", "react-dom"]
        })
      ]
    }
  }
});
