import { describe, expect, it } from "vitest";
import { useClickOutside, useEventListener } from "../index";

// 描述测试套件：测试hooks/index模块的导出功能
describe("hooks/index", () => {
  // 测试用例：验证useEventListener是否被正确导出
  it("useEventListener should be exported", () => {
    // 断言useEventListener是一个已定义的函数/对象
    expect(useEventListener).toBeDefined();
  });
  // 测试用例：验证useClickOutside是否被正确导出
  it("useClickOutside should be exported", () => {
    // 断言useClickOutside是一个已定义的函数/对象
    expect(useClickOutside).toBeDefined();
  });
});
