import { describe, it, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { each, get } from "lodash-es";
import { BaizePopconfirm } from ".";
import { withInstall } from "@baize-ui/utils";
import type { PopconfirmProps } from "./types";

import PopConfirm from "./Popconfirm.vue";

// 创建组件实例
//vi.fn() 是 Vitest 提供的 mock 函数（模拟函数）创建方法
const onConfirm = vi.fn();
const onCancel = vi.fn();

describe("Popconfirm.vue", ()=> {
  const props = {
    title: "Test Title",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    confirmButtonType: "primary",
    cancelButtonType: "info",
    icon: "check-circle",
    iconColor: "green",
    hideIcon: false,
    hideAfter: 500,
    width: 200,
  } as PopconfirmProps;
  

  it("should accept all props", () => {
    const wrapper = mount(PopConfirm, {
      props,
    });

    each(props, (value, key) => {
      expect(get(wrapper.props(), key)).toBe(value);
    });
  });

  it("should render slot content correctly", () => {
    const slotContent = "Slot Content";
    const wrapper = mount(PopConfirm, {
      props,
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.text()).toContain(slotContent);
  });
})