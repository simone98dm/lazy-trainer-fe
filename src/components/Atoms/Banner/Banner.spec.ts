import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Banner from "./Banner.vue";

describe("Banner", () => {
  it("renders correctly", () => {
    const wrapper = mount(Banner, {
      props: {
        text: "Hello World",
      },
    });

    expect(wrapper.text()).toContain("Hello World");
  });
});
