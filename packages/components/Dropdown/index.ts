import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import {withInstall} from '@baize-ui/utils'

export const BaizeDropdown = withInstall(Dropdown)
export const BaizeDropdownItem = withInstall(DropdownItem)

export * from './types'
