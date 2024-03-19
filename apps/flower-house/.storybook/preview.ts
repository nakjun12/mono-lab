import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS
} from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";
import "../app/core/shared/globals.css";
import withAppRouterContext from "../app/core/shared/libs/with-app-router-context";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS
      },
      defaultViewport: "iphone14pro"
    },
    nextjs: {
      appDirectory: true
    }
  },
  decorators: [withAppRouterContext]
};

export default preview;
