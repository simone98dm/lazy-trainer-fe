<script setup lang="ts">
import { useSettingStore } from '~/stores';

const settingsStore = useSettingStore();

if (settingsStore.darkMode) {
  const theme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  settingsStore.toggleDarkMode(theme);
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
</script>

<template>
  <div
    class="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
  >
    <PageHeader />
    <main
      class="flex-grow px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full max-w-7xl mx-auto dark:text-slate-100 text-slate-900 content animate-fade-in"
    >
      <slot />
    </main>
    <PageFooter />
  </div>
  <GlobalLoading />
  <ToastContainer />
</template>

<style>
html.dark {
  color-scheme: dark;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.content {
  margin-bottom: 5rem;
  min-height: calc(100vh - 10rem);
}

/* Page transition animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
</style>
