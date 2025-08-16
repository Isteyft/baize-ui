import { vLoading } from "./directive";
import { Loading } from "./service";
import type { App } from "vue";

export const BaizeLoading = {
  name: "BaizeLoading",
  install(app: App) {
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading,
};

export default BaizeLoading;

export {
  vLoading,
  vLoading as BaizeLoadingDirective,
  Loading as BaizeLoadingService,
};

export * from "./types";
