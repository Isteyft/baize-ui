import { rAF } from "@baize-ui/utils";
import { describe, it, expect } from "vitest";
import { Loading } from "./service";

describe("Loading", () => {
  it("should creat Loading instance", async () => {
    const instance = Loading();
    // 断言instance是一个已定义的实例
    expect(instance).toBeDefined();
  });

  it("should render mask", async () => {
    Loading();
    await rAF();
    expect(document.querySelector(".baize-loading__mask")).toBeTruthy();
  });

  it("should close Loading and remove it from DOM", async () => {
    const instance = Loading();

    await rAF();
    expect(document.querySelector(".er-loading")).toBeTruthy();
    instance.close();
    await rAF();

    expect(document.querySelector(".er-loading")).toBeFalsy();
  });

});