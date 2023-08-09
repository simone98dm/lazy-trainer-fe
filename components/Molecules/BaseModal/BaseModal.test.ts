import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseModal from "./BaseModal.vue";

describe("BaseModal", () => {
  it("emits a close event when the close button is clicked", async () => {
    // Mount the component
    const wrapper = mount(BaseModal);

    // Find and click the close button
    await wrapper.find("button").trigger("click");

    // Assert that a close event was emitted
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("displays the provided title", () => {
    // Mount the component with a title prop
    const wrapper = mount(BaseModal, {
      props: {
        title: "Test Modal Title",
      },
    });

    // Assert that the title is displayed correctly
    expect(wrapper.find("h1").text()).toBe("Test Modal Title");
  });

  it("renders slot content correctly", () => {
    // Mount the component with slot content
    const wrapper = mount(BaseModal, {
      slots: {
        content: "Test Modal Content",
      },
    });

    // Assert that the slot content is displayed correctly
    expect(wrapper.text()).toContain("Test Modal Content");
  });

  it("renders slot actions correctly", () => {
    // Mount the component with slot actions
    const wrapper = mount(BaseModal, {
      slots: {
        actions: "Test Modal Actions",
      },
    });

    // Assert that the slot actions are displayed correctly
    expect(wrapper.text()).toContain("Test Modal Actions");
  });
});
