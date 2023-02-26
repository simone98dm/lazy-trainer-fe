import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Item from "./Item.vue";

describe("Item", () => {
  it("renders correctly", () => {
    const wrapper = mount(Item, {
      props: {
        caption: "caption",
        description: "description",
        name: "name",
      },
    });

    expect(wrapper.html()).toContain("name");
    expect(wrapper.html()).toContain("caption");
    expect(wrapper.html()).toContain("description");
    expect(wrapper.html()).toContain("font-bold");
  });

  it("renders correctly with time", () => {
    const wrapper = mount(Item, {
      props: {
        caption: "caption",
        description: "description",
        name: "name",
        time: 60000,
      },
    });

    expect(wrapper.html()).toContain("1'00");
  });

  it("renders correctly with reps", () => {
    const wrapper = mount(Item, {
      props: {
        caption: "caption",
        description: "description",
        name: "name",
        reps: 3,
      },
    });

    expect(wrapper.html()).toContain("3r");
  });

  it("renders correctly with request changes", () => {
    const wrapper = mount(Item, {
      props: {
        name: "name",
        requestChange: true,
      },
    });

    expect(wrapper.find("p.text-red-600").text()).toBe("Client request to change this activity");
  });
});
