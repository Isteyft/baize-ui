<script setup lang="ts">
import { ref, computed } from "vue";
import { addUnit } from "@baize-ui/utils";
// import { useLocale } from "@baize-ui/hooks";
import type { TooltipInstance } from "../Tooltip";
import type { PopconfirmProps, PopconfirmEmits } from "./types";

import BaizeTooltip from "../Tooltip/Tooltip.vue";
import BaizeButton from "../Button/Button.vue";
import BaizeIcon from "../Icon/Icon.vue";

defineOptions({
  name: "BaizePopconfirm",
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: "",
  confirmButtonType: "primary",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
});

const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }));

// const locale = useLocale();

function hidePopper() {
  tooltipRef.value?.hide();
}

function confrim(e: MouseEvent) {
  emits("confirm", e);
  hidePopper();
}

function cancel(e: MouseEvent) {
  emits("cancel", e);
  hidePopper();
}
</script>

<template>
  <baize-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="baize-popconfirm" :style="style">
        <div class="baize-popconfirm__main">
          <baize-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <!-- 取消按钮 -->
        <div class="baize-popconfirm__action">
          <baize-button
            class="baize-popconfirm__cancel"
            size="small"
            :type="cancelButtonType"
            @click="cancel"
          >
            <!-- {{ cancelButtonText || locale.t("popconfirm.cancelButtonText") }} -->
            no
          </baize-button> 
          <!-- 确认按钮 -->
          <baize-button
            class="baize-popconfirm__confirm"
            size="small"
            :type="confirmButtonType"
            @click="confrim"
          >
            <!-- {{ confirmButtonText || locale.t("popconfirm.confirmButtonText") }} -->
            yes
          </baize-button>
        </div>
      </div>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </baize-tooltip>
</template>

<style scoped>
@import './style.css';
</style>