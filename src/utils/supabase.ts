import { createClient } from "@supabase/supabase-js";
import { useNotificationStore } from "~/stores";

export let notificationClient: any;

export async function initNotification() {
  if (!notificationClient) {
    notificationClient = createClient(
      import.meta.env.VITE_SUPABASE_NOTIFICATION_URL,
      import.meta.env.VITE_SUPABASE_NOTIFICATION_KEY
    );
  }

  const notificationStore = useNotificationStore();
  notificationStore.retrieveUserNotifications();
}
