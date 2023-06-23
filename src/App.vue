<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col p-4 gap-4 min-h-screen text-neutral scroll-smooth bg-base-100 text-sm duration-300 transition-colors selection:bg-primary">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <MainContainer />
          <template #fallback>
            <span class="loading loading-ring w-16 m-auto text-primary"></span>
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
    <div class="flex flex-col justify-center items-center bg-base-200 rounded-xl p-4 self-center font-semibold">
      <p>
        Inspired by
        <a href="https://github.com/arifszn/gitprofile" target="_blank" class="link link-info no-underline">
          GitProfile
        </a>
      </p>
      <p>
        Made with
        <a href="https://vuejs.org" target="_blank" class="link link-primary no-underline">
          Vue.js
        </a>
        and ❤️
      </p>
    </div>
    <p class="self-center font-medium text-xs text-primary-focus">
      Copyright © 2023 Daniele Nicosia
    </p>
  </div>
</template>
