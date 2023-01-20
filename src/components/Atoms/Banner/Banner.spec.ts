import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Banner from "./Banner.vue";
import { Color } from "~/utils";

describe("Banner", () => {
  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
      },
    });

    expect(wrapper.text()).toContain("Hello World");
    expect(wrapper.classes()).toContain("bg-indigo-300");
    expect(wrapper.find("icon").classes()).toContain("text-indigo-700");
  });

  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
        color: Color.DANGER,
      },
    });

    expect(wrapper.classes()).toContain("bg-red-300");
    expect(wrapper.find("icon").classes()).toContain("text-red-700");
  });

  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
        color: Color.DARK,
      },
    });

    expect(wrapper.classes()).toContain("bg-slate-300");
    expect(wrapper.find("icon").classes()).toContain("text-slate-700");
  });

  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
        color: Color.LIGHT,
      },
    });

    expect(wrapper.classes()).toContain("bg-white");
    expect(wrapper.find("icon").classes()).toContain("text-black");
  });

  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
        color: Color.PRIMARY,
      },
    });

    expect(wrapper.classes()).toContain("bg-indigo-300");
    expect(wrapper.find("icon").classes()).toContain("text-indigo-700");
  });

  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
        color: Color.PURPLE,
      },
    });

    expect(wrapper.classes()).toContain("bg-purple-300");
    expect(wrapper.find("icon").classes()).toContain("text-purple-700");
  });

  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
        color: Color.SUCCESS,
      },
    });

    expect(wrapper.classes()).toContain("bg-green-300");
    expect(wrapper.find("icon").classes()).toContain("text-green-700");
  });

  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
        color: Color.WARNING,
      },
    });

    expect(wrapper.classes()).toContain("bg-yellow-300");
    expect(wrapper.find("icon").classes()).toContain("text-yellow-700");
  });
});
