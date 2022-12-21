import { defineStore } from "pinia";
import { markNotificationsAsRead } from "~/helpers/http";
import { useUserStore } from "./user";
import { INotification } from "~/models/Notification";
import { Notification } from "~/utils";
import { notificationClient } from "~/utils/supabase";

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
    hasUnreadNotifications(state) {
      return (
        state.notifications.filter((notification) => !notification.isRead)
          .length > 0
      );
    },
  },
  actions: {
    async retrieveUserNotifications() {
      console.log("retrieveUserNotifications");
      const userStore = useUserStore();
      const { data, error } = await notificationClient
        .from("notifications")
        .select()
        .or(`userId.eq.broadcast,userId.eq.${userStore.userId}`);
      if (!error) {
        this.notifications = mapNotifications(data as INotification[]);

        await notificationClient
          .channel("public:notifications")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "notifications",
              filter: `userId=eq.${userStore.userId}`,
            },
            (payload: any) => {
              this.notifications.push(
                ...mapNotifications([payload.new as INotification])
              );
            }
          )
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "notifications",
              filter: `userId=eq.broadcast`,
            },
            (payload: any) => {
              this.notifications.push(
                ...mapNotifications([payload.new as INotification])
              );
            }
          )
          .subscribe();
      }
    },
    async markAsRead(id?: string) {
      const userStore = useUserStore();
      const ids = [];
      if (!id) {
        ids.push(...this.notifications.map((notification) => notification.id));
      }

      await ids.map(
        async (id) => await markNotificationsAsRead(userStore.userId, id)
      );

      if (id) {
        const notificationIndex = this.notifications.findIndex(
          (notification) => notification.id === id
        );
        if (notificationIndex) {
          this.notifications[notificationIndex].isRead = true;
          this.notifications[notificationIndex].readAt =
            new Date().toISOString();
        }
      } else {
        this.notifications = this.notifications.map((notification) => ({
          ...notification,
          isRead: true,
          readAt: notification.readAt
            ? notification.readAt
            : new Date().toISOString(),
        }));
      }
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
    formattedDate: Intl.DateTimeFormat("it-IT", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(notification.created_at)),
  }));
}
