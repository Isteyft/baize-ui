<script setup lang="ts">
import { computed, ref, provide } from "vue";
import { omit, isNil } from "lodash-es";
import { type ButtonInstance, BaizeButton, BaizeButtonGroup } from "../Button/index";
import type { TooltipInstance } from "../Tooltip/types";
import type {
  DropdownProps,
  DropdownItemProps,
  DropdownEmits,
  DropdownInstance,
  DropdownContext,
} from "./types";
import { useDisabledStyle } from "@baize-ui/hooks";

import { DROPDOWN_CTX_KEY } from "./constants.ts";

import DropdownItem from "./DropdownItem.vue";
import BaizeTooltip from "../Tooltip/Tooltip.vue";

defineOptions({
  name: "BaizeDropdown",
  //默认透传属性
  inheritAttrs: false,
});

const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[],
});
const emits = defineEmits<DropdownEmits>();
const slots = defineSlots();

const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();

const tooltipProps = computed(() =>
  omit(props, ["items", "hideAfterClick", "size", "type", "splitButton"])
);

function handleItemClick(e: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide();
  !isNil(e.command) && emits("command", e.command);
}

!TEST && useDisabledStyle();
provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
});


defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
});
</script>


<template> 
  <div class="baize-dropdown" :class="{ 'is-disabled': props.disabled }">
    <baize-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton" 
      :virtual-ref="triggerRef?.ref?.value"  
      @visible-change="$emit('visible-change', $event)"
    >
      <baize-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="disabled"
      >
        <baize-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </baize-button>
        <baize-button ref="triggerRef" icon="angle-down" />
      </baize-button-group>
      <slot name="default" v-else></slot>
      <template #content>
        <div class="baize-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <dropdown-item v-bind="item" />
            </template>
          </slot>
        </div>
      </template>
    </baize-tooltip>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>