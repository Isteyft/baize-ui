import type { App, Plugin } from "vue";
import { each } from "lodash-es";
import {
  provideGlobalConfig,
  type ConfigProviderProps,
} from "@baize-ui/components";

// // 定义一个函数 makeInstaller，用于创建一个插件安装函数（传值也是plugin插件
// export function makeInstaller(components: Plugin[]) {
//   //给每个plugin遍历并且use他，就不用一个个use
//   const install = (app: App) =>
//     each(components, (c) => {
//       app.use(c);
//     });

//   return install;
// }

export function makeInstaller(componets: Plugin[]) {
  const installer = (app: App, opts?: ConfigProviderProps) => {
    each(componets, (c) => app.use(c));
    if (opts) provideGlobalConfig(opts, app, true);
  };

  return installer as Plugin;
}

export default makeInstaller;
