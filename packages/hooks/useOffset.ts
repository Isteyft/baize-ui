import { type Ref, computed } from "vue";

interface UseOffsetOptions {
  offset: number;
  boxHeight: Ref<number>;
  getLastBottomOffset(): number;
}

interface UseOffsetResult {
  topOffset: Ref<number>;
  bottomOffset: Ref<number>;
}

export function useOffset(opts: UseOffsetOptions): UseOffsetResult {

    const lastButtonOffset = computed(() => opts.getLastBottomOffset())
    const topOffset = computed(() => lastButtonOffset.value + opts.offset)
    const bottomOffset = computed(() => topOffset.value + opts.boxHeight.value);

    return {
        topOffset,
        bottomOffset,
    };
}


export default useOffset;
