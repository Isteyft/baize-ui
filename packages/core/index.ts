import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import makeInstaller from "./makeInstaller";
import components from "./components";
import printLogo from "./printLogo";
import '@baize-ui/theme/index.css'

printLogo()

library.add(fas);
const installer = makeInstaller(components);

export * from "@baize-ui/components";
export * from '@baize-ui/locale';
export default installer;