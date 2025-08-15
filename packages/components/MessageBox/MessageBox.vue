<script setup lang="ts">
import type { MessageBoxProps, MessageBoxAction } from "./types";
import type { InputInstance } from "../Input/types";
import { useZIndex, useId } from "@baize-ui/hooks";
import { typeIconMap } from "@baize-ui/utils";
import { reactive, computed, ref, watch, nextTick, type Ref } from "vue";

// import BaizeOverlay from "../Overlay/Overlay.vue";
import BaizeIcon from "../Icon/Icon.vue";
import BaizeButton from "../Button/Button.vue";
import BaizeInput from "../Input/Input.vue";
import { isFunction, isNil } from "lodash-es";

defineOptions({
  name: "BaizeMessageBox",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MessageBoxProps>(), {
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  confirmButtonType: "primary",
  roundButton: false,
  boxType: "",
  inputValue: "",
  inputPlaceholder: "Please input...",
  confirmButtonText: "Ok",
  cancelButtonText: "Cancel",
  showConfirmButton: true,
});

const { doAction } = props;
const { nextZIndex } = useZIndex();

const headerRef = ref<HTMLElement>();
const inputRef = ref<InputInstance>();
const inputId = useId();

const state = reactive({
  ...props,
  zIndex: nextZIndex(),
});

const hasMessage = computed(() => !!state.message);
const iconComponent = computed(
  () => state.icon ?? typeIconMap.get(state.type ?? "")
);

watch(
  ()=> props.visible?.value,
  val=>{
    if(val) state.zIndex = nextZIndex();
    if(props.boxType !== 'prompt') return

    if(!val) return

    nextTick(()=>{
      inputRef.value && inputRef.value.focus()
    })
  }
)

function handleWrapperClick() {
  props.closeOnClickModal && handleAction("close");
}

// 键盘事件
function handleInputEnter(e: KeyboardEvent) {
  if (state.inputType === "textarea") return;
  e.preventDefault();
  return handleAction("confirm");
}
// 关闭前的钩子函数
function handleAction(action: MessageBoxAction) {
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => doAction(action, state.inputValue))
    : doAction(action, state.inputValue);
}
// 关闭
function handleClose() {
  handleAction("close");
}
</script>

<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <baize-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div
        role="dialog"
        class="baize-overlay-message-box"
        @click="handleWrapperClick"
      >
        <div
          ref="rootRef"
          :class="[
            'er-message-box',
            {
              'is-center': state.center,
            },
          ]"
          @click.stop
        >
          <div
            v-if="!isNil(state.title)"
            ref="headerRef"
            class="baize-message-box__header"
            :class="{ 'show-close': state.showClose }"
          >
            <div class="baize-message-box__title">
              <baize-icon
                v-if="iconComponent && state.center"
                :class="{
                  [`er-icon-${state.type}`]: state.type,
                }"
                :icon="iconComponent"
              />
              {{ state.title }}
            </div>
            <button
              v-if="showClose"
              class="baize-message-box__header-btn"
              @click.stop="handleClose"
            >
              <baize-icon icon="xmark" />
            </button>
          </div>
          <div class="baize-message-box__content">
            <baize-icon
              v-if="iconComponent && !state.center && hasMessage"
              :class="{
                [`er-icon-${state.type}`]: state.type,
              }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="baize-message-box__message">
              <slot>
                <component
                  :is="state.showInput ? 'label' : 'p'"
                  :for="state.showInput ? inputId : void 0"
                >
                  {{ state.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="baize-message-box__input">
            <baize-input
              v-model="state.inputValue"
              ref="inputRef"
              :placeholder="state.inputPlaceholder"
              :type="state.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <div class="baize-message-box__footer">
            <baize-button
              v-if="state.showCancelButton"
              class="baize-message-box__footer-btn baize-message-box__cancel-btn"
              :type="state.cancelButtonType"
              :round="state.roundButton"
              :loading="state.cancelButtonLoading"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{ state.cancelButtonText }}</baize-button
            >
            <baize-button
              v-show="state.showConfirmButton"
              class="baize-message-box__footer-btn baize-message-box__confirm-btn"
              :type="state.confirmButtonType ?? 'primary'"
              :round="state.roundButton"
              :loading="state.confirmButtonLoading"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{ state.confirmButtonText }}</baize-button
            >
          </div>
        </div>
      </div>
    </baize-overlay>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>