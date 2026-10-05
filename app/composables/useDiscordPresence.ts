/**
 * Live Discord presence, streamed by the my-location Worker as Server-Sent Events. Browser only: it changes
 * all the time, like the live position. `presence` is null until the bot has seen it, or if the stream is down.
 */
export function useDiscordPresence() {
  const { liveApiUrl } = useRuntimeConfig().public
  const presence = shallowRef<DiscordPresenceData | null>(null)
  const loading = ref(true)

  let source: EventSource | undefined
  let failures = 0

  onMounted(() => {
    source = new EventSource(`${liveApiUrl}/presence/stream`)
    source.addEventListener('message', (event) => {
      presence.value = JSON.parse(event.data) as DiscordPresenceData | null
      loading.value = false
      failures = 0
    })
    // EventSource reconnects by itself: only give up when the stream can't be reached at all
    source.addEventListener('error', () => {
      if (++failures < 3) return
      source?.close()
      loading.value = false
    })
  })
  onBeforeUnmount(() => source?.close())

  return { presence, loading }
}
