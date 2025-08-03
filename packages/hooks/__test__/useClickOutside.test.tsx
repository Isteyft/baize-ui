import { describe, expect, it, vi } from "vitest";
import { ref, defineComponent } from "vue";
import { mount } from "@vue/test-utils";

import useClickOutside from "../useClickOutside";

describe("hooks/useClickOutside", () => {
  // 测试用例：应该添加"click-outside"监听器
  it('should add "click-outside" listener', async () => {
    // 创建两个ref引用，一个用于目标元素，一个用于按钮
    const target = ref<HTMLElement>();
    const btnRef = ref<HTMLElement>();

    
    // 创建一个模拟函数用于检测是否被调用
    const handler = vi.fn();

    // 挂载一个测试组件
    mount(
      defineComponent({
        setup() {
          // 使用useClickOutside钩子，当点击target元素外部时调用handler
          useClickOutside(target, handler);
          return () => (
            // 渲染一个div作为目标元素，内部包含一个按钮
            <div ref={target}>
              <button ref={btnRef}>click me</button>
            </div>
          );
        },
      })
    );
    // 模拟点击按钮（目标元素内部）
    await btnRef.value?.click();
    // 验证handler不应该被调用（因为点击的是内部元素）
    expect(handler).not.toHaveBeenCalled();

    // 模拟点击文档body（目标元素外部）
    await document.body.click();
    // 验证handler应该被调用一次（因为点击的是外部元素）
    expect(handler).toHaveBeenCalledOnce();
  });
});
