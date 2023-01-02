<script setup lang="ts">
  import { useSettingStore } from "~/stores";
  import { useNotificationStore } from "~/stores/notification";

  const notificationStore = useNotificationStore();
  const settingsStore = useSettingStore();
  settingsStore.setHeader("Notifications");

  setTimeout(() => {
    notificationStore.markAsRead();
  }, 5000);
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-full"
    v-if="notificationStore.notifications.length <= 0"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <Icon component="notifications" class="text-6xl text-gray-500" />
        <h3 class="text-2xl text-gray-500 mt-4">No notifications</h3>
      </div>
    </div>
  </div>
  <NotificationItem
    v-else
    v-for="notification in notificationStore.getUserNotifications"
    :key="notification.id"
    :title="notification.title"
    :description="notification.message"
    :type="notification.type"
    :caption="notification.formattedDate"
    :is-read="notification.isRead"
  />
</template>
