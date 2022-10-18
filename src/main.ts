import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "material-icons/iconfont/material-icons.css";
import App from "./App.vue";
import router from "./router/router";
import { initializeApp } from "firebase/app";

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

initializeApp(firebaseConfig);

app.mount("#app");
