import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BackButton from "./BackButton.vue";

describe("BackButton", () => {
  it("emits a click event when the button is clicked", async () => {
    const wrapper = mount(BackButton, {
      global: {
        stubs: {
          MaterialIcon: true,
        },
      },
    });

    await wrapper.findComponent({ name: "MaterialIcon" }).trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("displays the correct content", () => {
    const wrapper = mount(BackButton, {
      global: {
        stubs: {
          MaterialIcon: true,
        },
      },
    });

    expect(wrapper.findComponent({ name: "MaterialIcon" }).exists()).toBe(true);
  });

  it("applies the correct styles", () => {
    const wrapper = mount(BackButton, {
      global: {
        stubs: {
          MaterialIcon: true,
        },
      },
    });

    expect(wrapper.find("material-icon-stub").classes()).toContain("back__button");
  });
});
