import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { LinkType } from "~/utils";
import ButtonLink from "./ButtonLink.vue"; // Import the correct path to your component

describe("ButtonLink", () => {
  it("emits a click event when the link is clicked", async () => {
    // Mount the component with a to prop
    const wrapper = mount(ButtonLink, {
      props: {
        to: { name: "home" },
        label: "test-link",
      },
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    // Find and click the RouterLink
    await wrapper.findComponent({ name: "RouterLink" }).trigger("click");

    // Assert that a click event was emitted
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("renders a BaseButton when type is BUTTON", () => {
    // Mount the component with type set to BUTTON
    const wrapper = mount(ButtonLink, {
      props: {
        to: { name: "home" },
        type: LinkType.BUTTON, // LinkType.BUTTON
        label: "test-link",
      },
      global: {
        stubs: {
          BaseButton: true,
        },
      },
    });

    // Assert that a BaseButton is rendered
    expect(wrapper.findComponent({ name: "BaseButton" }).exists()).toBe(true);
  });

  it("renders content and label correctly", () => {
    // Mount the component with label and slot content
    const wrapper = mount(ButtonLink, {
      props: {
        to: { name: "home" },
        label: "Test Label",
      },
      slots: {
        default: "Slot Content",
      },
    });

    // Assert that the label and slot content are rendered
    expect(wrapper.text()).toContain("Test Label");
    expect(wrapper.text()).toContain("Slot Content");
  });

  it("renders MaterialIcon when icon is provided", () => {
    // Mount the component with an icon
    const wrapper = mount(ButtonLink, {
      props: {
        to: { name: "home" },
        icon: "house", // Replace with an actual icon name
        label: "test-link",
      },
      global: {
        stubs: {
          MaterialIcon: true,
        },
      },
    });

    // Assert that a MaterialIcon is rendered
    expect(wrapper.findComponent({ name: "MaterialIcon" }).exists()).toBe(true);
  });
});
