import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";
import { createPinia, setActivePinia } from "pinia";
import { ButtonColor } from "~/utils";

describe("Button", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders correctly", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-indigo-600");
  });

  it("renders correctly", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
        color: ButtonColor.PURPLE,
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-purple-600");
    expect(wrapper.classes()).toContain("w-full");
    expect(wrapper.classes()).toContain("rounded-full");
  });
});
