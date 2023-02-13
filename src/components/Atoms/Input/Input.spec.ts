import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe("Input", () => {
  it("renders correctly", () => {
    const wrapper = mount(Input, {
      props: {
        label: "Test",
        name: "test",
      },
    });

    expect(wrapper.find("label").text()).toContain("Test");
    expect(wrapper.find("input").attributes("name")).toBe("test");
    expect(wrapper.find("input").attributes("type")).toBe("text");
  });

  it("renders correctly with error", () => {
    const wrapper = mount(Input, {
      props: {
        label: "Test",
        value: "Hello World",
        error: "Error",
        hasError: true,
      },
    });

    expect(wrapper.find("label").classes()).toContain("text-red-600");
    expect(wrapper.find("input").classes()).toContain("border-red-600");
    expect(wrapper.find("span").text()).toContain("Error");
    expect(wrapper.find("span").classes()).toContain("text-red-600");
  });
});
