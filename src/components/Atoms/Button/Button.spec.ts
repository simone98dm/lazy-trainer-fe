import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";
import { createPinia, setActivePinia } from "pinia";
import { ButtonColor } from "~/utils";

describe("Button", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders correctly primary", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-indigo-600");
  });

  it("renders correctly purple", () => {
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

  it("renders correctly danger", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
        color: ButtonColor.DANGER,
        full: true,
        circular: true,
      },
    });

    expect(wrapper.classes()).toContain("bg-red-600");
  });

  it("renders correctly dark", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
        color: ButtonColor.DARK,
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-slate-800");
  });

  it("renders correctly light", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
        color: ButtonColor.LIGHT,
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-white");
  });

  it("renders correctly success", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
        color: ButtonColor.SUCCESS,
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-green-600");
  });

  it("renders correctly warning", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
        color: ButtonColor.WARNING,
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-yellow-600");
  });

  it("renders correctly transparent", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Hello World",
        color: ButtonColor.TRASPARENT,
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).not.toContain("bg-indigo-600");
  });
});
