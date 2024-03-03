import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS
} from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";
import withAppRouterContext from "../app/lib/with-app-router-context";
import "../app/ui/shared/globals.css";

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
      defaultViewport: "iphone14promax"
    },
    nextjs: {
      appDirectory: true
    }
  },
  decorators: [withAppRouterContext]
};

export default preview;
