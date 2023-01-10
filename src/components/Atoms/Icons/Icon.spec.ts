import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Icon from "./Icon.vue";

describe("Icon", () => {
  it("renders correctly", () => {
    const wrapper = mount(Icon);
    expect(wrapper.classes()).toContain("material-icons-outlined");
  });
  it("renders correctly", () => {
    const wrapper = mount(Icon, {
      props: {
        component: "add",
        customClass: "text-red-500",
      },
    });
    expect(wrapper.classes()).toContain("text-red-500");
    expect(wrapper.html()).toContain("add");
  });
});
