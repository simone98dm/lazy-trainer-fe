import { defineStore } from "pinia";
import { markNotificationsAsRead } from "~/helpers/http";
import { createClient } from "@supabase/supabase-js";
import { useUserStore } from "./user";
import { INotification } from "~/models/Notification";
import { Notification } from "~/utils";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_NOTIFICATION_URL,
  import.meta.env.VITE_SUPABASE_NOTIFICATION_KEY
);

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [] as Notification[],
  }),
  getters: {
    getUserNotifications(state) {
      return state.notifications.sort(
        (a: Notification, b: Notification) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
  },
  actions: {
    async retrieveUserNotifications() {
      const { data, error } = await supabase.from("notifications").select();
      if (!error) {
        this.notifications = mapNotifications(data as INotification[]);

        const userStore = useUserStore();
        supabase
          .channel("public:notifications")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "notifications",
              filter: `userId=eq.${userStore.userId}`,
            },

            (payload) => {
              const mappedNotification = [
                ...this.notifications,
                ...mapNotifications([payload.new as INotification]),
              ];

              this.notifications = mappedNotification;
            }
          )
          .subscribe();
      }
    },
    async markAsRead(id?: string) {
      await markNotificationsAsRead(id);
    },
  },
});

function mapNotifications(data: INotification[]): Notification[] {
  return data.map((notification: INotification) => ({
    id: notification.id,
    userId: notification.userId,
    title: notification.title,
    message: notification.message,
    createdAt: notification.created_at,
    readAt: notification.read_at,
    type: notification.type,
    isRead: !!notification.read_at,
  }));
}
