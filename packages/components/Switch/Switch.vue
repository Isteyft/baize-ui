<script setup lang="ts">
import type { SwitchProps, SwitchEmits, SwitchInstance } from "./types";
import { ref, computed, onMounted, watch } from "vue";
import { useId } from "@baize-ui/hooks";

defineOptions({ name: "Baizewitch", inheritAttrs: false });
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});

const emits = defineEmits<SwitchEmits>();
const isDisabled = computed(() => props.disabled);

const innerValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement>();
const inputId = useId().value;
const checked = computed(() => innerValue.value === props.activeValue);

const focus: SwitchInstance["focus"] = function () {
  inputRef.value?.focus();
};

function handleChange(e: Event) { 
  if (isDisabled.value) return; // 如果禁用了，则返回

  const newVal = checked.value ? props.inactiveValue : props.activeValue;

  innerValue.value = newVal;

  emits("update:modelValue", newVal);

  emits("change", newVal);
}

onMounted(() => {
  inputRef.value!.checked = checked.value;
});
watch(checked, (val) => {
  inputRef.value!.checked = val;
  // 预留 form 校验
});

defineExpose<SwitchInstance>({
  checked,
  focus,
});
</script>

<template>
  <div
    class="baize-switch"
    :class="{
      [`baize-switch--${size}`]: size,
      'is-disabled': isDisabled,
      'is-checked': checked,
    }"
    @click="handleChange"
  >
    <input
      class="baize-switch__input"
      type="checkbox"
      role="switch"
      ref="inputRef"
      :id="inputId"
      :name="name"
      :disabled="isDisabled"
      :checked="checked"
      @keydown.enter="handleChange"
    />
    <div class="baize-switch__core">
      <div class="baize-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="baize-switch__core-inner-text"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="baize-switch__core-action"></div>
    </div>
  </div>
</template>


<style>
@import "./style.css";
</style>
