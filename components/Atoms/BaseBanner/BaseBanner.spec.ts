import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import BaseBanner from "./BaseBanner.vue";

describe("BaseBanner", () => {
  it.skip("renders correctly", () => {
    const wrapper = mount(BaseBanner, {
      props: {
        text: "Hello World",
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-green-300");
    expect(wrapper.find("icon").classes()).toContain("text-green-700");
  });

  it.skip("renders correctly", () => {
    const wrapper = mount(BaseBanner, {
      props: {
        text: "Hello World",
        color: "danger",
      },
    });

    expect(wrapper.classes()).toContain("bg-red-300");
    expect(wrapper.find("icon").classes()).toContain("text-red-700");
  });

  it.skip("renders correctly", () => {
    const wrapper = mount(BaseBanner, {
      props: {
        text: "Hello World",
        color: "dark",
      },
    });

    expect(wrapper.classes()).toContain("bg-slate-300");
    expect(wrapper.find("icon").classes()).toContain("text-slate-700");
  });

  it.skip("renders correctly", () => {
    const wrapper = mount(BaseBanner, {
      props: {
        text: "Hello World",
        color: "light",
      },
    });

    expect(wrapper.classes()).toContain("bg-white");
    expect(wrapper.find("icon").classes()).toContain("text-black");
  });

  it.skip("renders correctly", () => {
    const wrapper = mount(BaseBanner, {
      props: {
        text: "Hello World",
        color: "primary",
      },
    });

    expect(wrapper.classes()).toContain("bg-green-300");
    expect(wrapper.find("icon").classes()).toContain("text-green-700");
  });

  it.skip("renders correctly", () => {
    const wrapper = mount(BaseBanner, {
      props: {
        text: "Hello World",
        color: "purple",
      },
    });

    expect(wrapper.classes()).toContain("bg-purple-300");
    expect(wrapper.find("icon").classes()).toContain("text-purple-700");
  });

  it.skip("renders correctly", () => {
    const wrapper = mount(BaseBanner, {
      props: {
        text: "Hello World",
        color: "success",
      },
    });

    expect(wrapper.classes()).toContain("bg-green-300");
    expect(wrapper.find("icon").classes()).toContain("text-green-700");
  });

  it.skip("renders correctly", () => {
    const wrapper = mount(BaseBanner, {
      props: {
        text: "Hello World",
        color: "warning",
      },
    });

    expect(wrapper.classes()).toContain("bg-yellow-300");
    expect(wrapper.find("icon").classes()).toContain("text-yellow-700");
  });
});
