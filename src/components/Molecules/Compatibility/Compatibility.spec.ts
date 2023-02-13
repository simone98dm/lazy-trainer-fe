import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Compatibility from "./Compatibility.vue";

describe("Compatibility", () => {
  it("render correctly", () => {
    const wrapper = mount(Compatibility);
    expect(wrapper.html()).toContain("We moved to a new home");
  });
});
