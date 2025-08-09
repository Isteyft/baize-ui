import ConfigProvider from "./ConfigProvider.vue";
import {withInstall }from '@baize-ui/utils'

export const BaizeConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './hooks'
