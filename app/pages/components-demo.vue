<script setup lang="ts">
import { ref } from 'vue';
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();
const showSkeleton = ref(false);
const showEmpty = ref(true);

function testSuccessToast() {
  toastStore.success('Activity saved successfully!');
}

function testErrorToast() {
  toastStore.error('Failed to save activity. Please try again.');
}

function testWarningToast() {
  toastStore.warning('This action cannot be undone.');
}

function testInfoToast() {
  toastStore.info('Session loaded with 5 activities.');
}

function toggleSkeleton() {
  showSkeleton.value = !showSkeleton.value;
}

function handleEmptyAction() {
  toastStore.success('Creating your first session!');
  showEmpty.value = false;
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <Card>
      <template #default>
        <h2 class="text-2xl font-bold mb-4">
          Toast Notifications Test
        </h2>
        <div class="flex flex-wrap gap-3">
          <BaseButton
            label="Success Toast"
            color="success"
            icon="check"
            @click="testSuccessToast"
          />
          <BaseButton
            label="Error Toast"
            color="danger"
            icon="error"
            @click="testErrorToast"
          />
          <BaseButton
            label="Warning Toast"
            color="warning"
            icon="error"
            @click="testWarningToast"
          />
          <BaseButton
            label="Info Toast"
            color="primary"
            icon="check"
            @click="testInfoToast"
          />
        </div>
      </template>
    </Card>

    <Card>
      <template #default>
        <h2 class="text-2xl font-bold mb-4">
          Loading States
        </h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">
              Regular Loading
            </h3>
            <Loading text="Loading your sessions..." />
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3">
              Small Loading
            </h3>
            <Loading
              :small="true"
              color="primary"
            />
          </div>
        </div>
      </template>
    </Card>

    <Card>
      <template #default>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">
            Skeleton Placeholders
          </h2>
          <BaseButton
            :label="showSkeleton ? 'Hide' : 'Show'"
            size="small"
            @click="toggleSkeleton"
          />
        </div>
        <div v-if="showSkeleton">
          <h3 class="text-lg font-semibold mb-3">
            Card Skeleton
          </h3>
          <PlaceholderList />

          <h3 class="text-lg font-semibold mb-3 mt-6">
            Activity Skeleton
          </h3>
          <div
            class="border border-slate-200 dark:border-slate-700 rounded-2xl"
          >
            <PlaceholderActivity />
            <PlaceholderActivity />
            <PlaceholderActivity />
          </div>
        </div>
      </template>
    </Card>

    <Card>
      <template #default>
        <h2 class="text-2xl font-bold mb-4">
          Empty States
        </h2>
        <div v-if="showEmpty">
          <EmptyState
            icon="self_improvement"
            title="No sessions yet"
            description="Get started by creating your first workout session. Track your progress and achieve your fitness goals!"
            action-label="Create Session"
            action-icon="add"
            @action="handleEmptyAction"
          />
        </div>
        <div
          v-else
          class="text-center py-8"
        >
          <p class="text-slate-600 dark:text-slate-400">
            Empty state cleared! Refresh to see it again.
          </p>
        </div>
      </template>
    </Card>

    <Card>
      <template #default>
        <h2 class="text-2xl font-bold mb-4">
          Enhanced Input
        </h2>
        <div class="space-y-6">
          <Input
            id="test-input"
            name="test-input"
            label="Your name"
            value=""
            :required="true"
            @change="() => {}"
          />
          <Input
            id="test-error"
            name="test-error"
            label="Email address"
            value=""
            error="Please enter a valid email address"
            @change="() => {}"
          />
        </div>
      </template>
    </Card>

    <Card>
      <template #default>
        <h2 class="text-2xl font-bold mb-4">
          Modern Switch
        </h2>
        <div class="flex items-center gap-4">
          <Switch
            id="test-switch"
            name="test-switch"
            :checked="false"
            @toggle="() => {}"
          />
          <span class="text-sm text-slate-600 dark:text-slate-400">
            Enable notifications
          </span>
        </div>
      </template>
    </Card>
  </div>
</template>
