import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import PlaceholderList from "./PlaceholderList.vue";

describe("PlaceholderCard", () => {
  it("renders correctly", () => {
    const wrapper = mount(PlaceholderList);
    expect(wrapper.findAll("PlaceholderCard").length).toBe(3);
  });
});
