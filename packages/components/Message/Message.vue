<script setup lang="ts">
import type { MessageProps, MessageCompInstance } from "./types";
import { computed, onMounted, ref, Transition, watch } from "vue";
import { getLastBottomOffset } from "./methods";
import { delay, bind } from "lodash-es";
// import { useOffset, useEventListener } from "@baize-ui/hooks";
import { addUnit } from "@baize-ui/utils";
import { typeIconMap, RenderVnode } from "@baize-ui/utils";
import BaizeIcon from "../Icon/Icon.vue";

defineOptions({ 
    name: "BaizeMessage" 
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
});

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();

// div 高度
const boxHeight = ref(0);

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight,
});

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");

const customStyle = computed(() => ({
  top: addUnit(topOffset.value),
  zIndex: props.zIndex,
}));

let timer: number;
function startTimmer() {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

function close() {
  visible.value = false;
}

// watch(visible, val => {
    
// })

onMounted(() => {
  visible.value = true;
  startTimmer();
});

defineExpose<MessageCompInstance>({
  bottomOffset,
  close,
});
</script>

<template>
  <Transition
    :name="props.transitionName"
    @aftbaize-leave="!visible && onDestory()" 
  >
    <div
      ref="messageRef"
      class="baize-message"
      :class="{
        [`baize-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      :style="customStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <baize-icon class="baize-message__icon" :icon="iconName" />
      <div class="baize-message__content">
        <slot>
          <rendbaize-vnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="baize-message__close" v-if="showClose">
        <baize-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style>
@import "./style.css";
</style>
