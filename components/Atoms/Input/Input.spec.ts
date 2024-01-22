import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";
import { computed } from "vue";

describe("InputComponent", () => {
  it("renders label and input field correctly", async () => {
    const wrapper = mount(Input, {
      props: {
        label: "Test Label",
        name: "testInput",
        id: "test",
      },
    });

    // Check if label is rendered correctly
    expect(wrapper.find("label").text()).toBe("Test Label");

    // Check if input field is rendered correctly
    const inputElement = wrapper.find("input");
    expect(inputElement.exists()).toBe(true);
    expect(inputElement.attributes("name")).toBe("testInput");
  });

  it("emits change event on input value change", async () => {
    const wrapper = mount(Input, {
      props: {
        label: "Test Label",
        name: "testInput",
        id: "test",
      },
    });

    const inputElement = wrapper.find("input");
    await inputElement.setValue("New Value");

    // Check if the emitted event matches
    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")![0]).toEqual(["New Value"]);
  });

  // Write more test cases for other scenarios...
});
