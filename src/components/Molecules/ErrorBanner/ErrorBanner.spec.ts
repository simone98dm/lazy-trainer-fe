import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ErrorBanner from "./ErrorBanner.vue";

describe("ErrorBanner", () => {
  it("render correctly", () => {
    const wrapper = mount(ErrorBanner, {
      props: {
        text: "Hello World",
      },
    });

    expect(wrapper.html()).toContain("Hello World");
  });
});
