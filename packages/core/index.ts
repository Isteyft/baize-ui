import { makeInstaller } from '@baize-ui/utils'

import '@baize-ui/theme/index.css'

import components from './components'

const installer = makeInstaller(components)

export * from '@baize-ui/components'
export default installer
