<script setup lang="ts">
</script>

<template>
  <div class="flex gap-4 min-h-screen flex-col scroll-smooth bg-base-100 text-sm text-neutral transition-colors selection:bg-primary md:text-base">
		<RouterView v-slot="{ Component }" class="grow p-4 lg:p-4">
			<template v-if="Component">
				<Transition mode="out-in">
					<KeepAlive>
						<Suspense>
              <component :is="Component" />
              <template #fallback>
                <span class="loading loading-ring w-16 m-auto text-primary"></span>
              </template>
            </Suspense>
					</KeepAlive>
				</Transition>
			</template>
		</RouterView>
	</div>
</template>
