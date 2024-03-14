import {
  AppRouterContext,
  type AppRouterInstance
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FC } from "react";

const withAppRouterContext = (Story: FC) => (
  <AppRouterContext.Provider value={{} as AppRouterInstance}>
    <Story />
  </AppRouterContext.Provider>
);

export default withAppRouterContext;

// invariant expected app router to be mounted 이슈로 인하여 추가하였음
// useRouter와 같은 next/navigation을 사용하는 컴포넌트에 decorators를 감싸주어야함
// https://github.com/storybookjs/storybook/issues/24722
