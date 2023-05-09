import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import PlaceholderList from "~~/components/Atoms/Placeholder/PlaceholderList.vue";

describe("PlaceholderCard", () => {
  it.skip("renders correctly", () => {
    const wrapper = mount(PlaceholderList);
    expect(wrapper.findAllComponents("PlaceholderCard").length).toBe(3);
  });
});
