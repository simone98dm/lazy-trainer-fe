import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BackButton from "./BackButton.vue";

describe("BackButton", () => {
  it("emits a click event when the button is clicked", async () => {
    const wrapper = mount(BackButton);

    await wrapper.find("button").trigger("click");

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

    expect(wrapper.find("button").text()).toContain("Back");

    expect(wrapper.findComponent({ name: "MaterialIcon" }).exists()).toBe(true);
  });

  it("applies the correct styles", () => {
    const wrapper = mount(BackButton);

    expect(wrapper.find("button").classes()).toContain("back__button");
  });
});
