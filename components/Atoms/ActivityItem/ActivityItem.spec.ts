import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ActivityItem from "./ActivityItem.vue";

describe("ActivityItem", () => {
  it("renders correctly", () => {
    const wrapper = mount(ActivityItem, {
      props: {
        activity: {
          description: "description",
          name: "name",
          reps: 0,
          requestChange: false,
          time: 0,
        },
      },
    });

    expect(wrapper.html()).toContain("name");
  });

  it("renders correctly with time", () => {
    const wrapper = mount(ActivityItem, {
      props: {
        activity: {
          description: "description",
          name: "name",
          time: 60000,
          reps: 0,
          requestChange: false,
        },
      },
    });

    expect(wrapper.html()).toContain("1'00");
  });

  it("renders correctly with reps", () => {
    const wrapper = mount(ActivityItem, {
      props: {
        activity: {
          description: "description",
          name: "name",
          reps: 3,
          time: 0,
          requestChange: false,
        },
      },
    });

    expect(wrapper.html()).toContain("3r");
  });
});
