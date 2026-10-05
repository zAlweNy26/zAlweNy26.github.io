interface ActivityResponse {
  fetchedAt: number
  github: GitHubActivityData | null
  wakatime: WakaTimeSummaryDay[] | null
}

/**
 * GitHub and WakaTime activity for the side panel. The my-location Worker fetches it hourly and caches it,
 * so it's fresher than the daily rebuild and no API key ends up in the site's build.
 * GitHub stays a whole year: the panel cuts it to the span it shows (`toGitHubActivity`).
 */
export function useActivity() {
  return useFetch(`${useRuntimeConfig().public.liveApiUrl}/activity`, {
    key: 'activity',
    server: false,
    lazy: true,
    transform: (res: ActivityResponse) => ({
      github: res.github,
      wakatime: res.wakatime ? summarizeWakaTime(res.wakatime) : null,
    }),
  })
}
