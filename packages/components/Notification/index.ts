import Notification from "./methods";
import {withInstallFunction} from '@baize-ui/utils'

export const BaizeNotification = withInstallFunction(Notification, '$notify')

export * from './types'
