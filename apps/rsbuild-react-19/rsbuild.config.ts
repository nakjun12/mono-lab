import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift("babel-plugin-react-compiler");
      }
    })
  ],
  server: {
    port: 2000
  },
  tools: {
    rspack: {
      output: {
        uniqueName: "rsbuild_react_19"
      },
      plugins: [
        new ModuleFederationPlugin({
          name: "rsbuild_react_19",
          exposes: {
            "./button": "./src/button.tsx"
          },
          remotes: {
            rsbuild_react_18:
              "rsbuild_react_18@http://localhost:3000/mf-manifest.json"
          },
          shared: ["react", "react-dom"]
        })
      ]
    }
  }
});
