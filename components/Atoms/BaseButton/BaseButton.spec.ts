import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "./BaseButton.vue";
import { createPinia, setActivePinia } from "pinia";

describe("BaseButton", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it.skip("renders correctly primary", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-emerald-600");
  });

  it.skip("renders correctly purple", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
        color: "purple",
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-purple-600");
    expect(wrapper.classes()).toContain("w-full");
    expect(wrapper.classes()).toContain("rounded-full");
  });

  it.skip("renders correctly danger", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
        color: "danger",
        full: true,
        circular: true,
      },
    });

    expect(wrapper.classes()).toContain("bg-red-600");
  });

  it.skip("renders correctly dark", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
        color: "dark",
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-slate-800");
  });

  it.skip("renders correctly light", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
        color: "light",
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-white");
  });

  it.skip("renders correctly success", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
        color: "success",
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-emerald-600");
  });

  it.skip("renders correctly warning", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
        color: "warning",
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-yellow-600");
  });

  it.skip("renders correctly transparent", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
        color: "trasparent",
        full: true,
        circular: true,
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).not.toContain("bg-emerald-600");
  });

  it.skip("renders loading in BaseButton", () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: "Hello World",
        loading: true,
      },
    });

    expect(wrapper.text()).not.toContain("Hello World");
    expect(wrapper.find("loading"));
  });

  it.skip("renders loading in BaseButton", () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.text()).not.toContain("Hello World");
  });
});
