import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
  env: {
    test: "hello,world!",
    fakeUser: "",
    fakePassword: "",
    fakeTrainerUser: "",
    fakeTrainerPassword: "",
  },
});
