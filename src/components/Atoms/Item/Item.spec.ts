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

    expect(wrapper.find("h4[name='item-name']").html()).toContain("name");
    expect(wrapper.find("p[name='item-caption']").html()).toContain("caption");
    expect(wrapper.find("p[name='item-description']").html()).toContain("description");
    expect(wrapper.find("h4[name='item-name']").classes()).toContain("font-semibold");
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

    expect(wrapper.find("h4[name='item-time']").html()).toContain("1'00");
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

    expect(wrapper.find("h4[name='item-reps']").html()).toContain("3r");
  });

  it("renders correctly with request changes", () => {
    const wrapper = mount(Item, {
      props: {
        name: "name",
        requestChange: true,
      },
    });

    expect(wrapper.find("p[name='item-request-changes']").text()).toBe(
      "Client request to change this activity"
    );
    expect(wrapper.find("p[name='item-request-changes']").classes()).toContain("text-red-600");
  });
});
