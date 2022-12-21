import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import Hotjar from "vue-hotjar";
import App from "./App.vue";
import router from "./router/router";
import { version } from "../package.json";
import "./style.css";
import "material-icons/iconfont/material-icons.css";
import { customLogger } from "./helpers/logger";
import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";
import { initNotification } from "./utils/supabase";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASEURL,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Hotjar, {
  id: import.meta.env.VITE_HOTJARKEY,
  isProduction: true,
  snippetVersion: 6,
});
app.use(VCalendar, {});
app.provide("$logger", customLogger);

initNotification();

initializeApp(firebaseConfig);

console.log(`Hello fellows devs👋, app version: ${version}`);

app.mount("#app");
