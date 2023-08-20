import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ActivityItem from "./ActivityItem.vue";

describe("ActivityItem", () => {
  it("renders correctly", () => {
    const wrapper = mount(ActivityItem, {
      props: {
        description: "description",
        name: "name",
      },
    });

    expect(wrapper.html()).toContain("name");
    expect(wrapper.html()).toContain("description");
  });

  it("renders correctly with time", () => {
    const wrapper = mount(ActivityItem, {
      props: {
        description: "description",
        name: "name",
        time: 60000,
      },
    });

    expect(wrapper.html()).toContain("1'00");
  });

  it("renders correctly with reps", () => {
    const wrapper = mount(ActivityItem, {
      props: {
        description: "description",
        name: "name",
        reps: 3,
      },
    });

    expect(wrapper.html()).toContain("3r");
  });
});
