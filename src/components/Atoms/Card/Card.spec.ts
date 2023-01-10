import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "./Card.vue";

describe("Card", () => {
  it("renders correctly", () => {
    const wrapper = mount(Card);
    expect(wrapper.classes()).toContain("p-4");
  });
  it("renders correctly", () => {
    const wrapper = mount(Card, {
      props: {
        padding: "small",
      },
    });
    expect(wrapper.classes()).toContain("p-2");
  });
});
