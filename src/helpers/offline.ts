import { useUserStore } from "~/store";
import log from "./logger";

function handleConnection() {
  if (navigator.onLine) {
    const userStore = useUserStore();
    userStore.logout();
  } else {
    log("User is offline", "info");
  }
}

export function initializeOffline() {
  window.addEventListener("online", handleConnection);
  window.addEventListener("offline", handleConnection);
}
