import type { DiscordActivity, DiscordPresenceData } from '../../app/utils/discord'
import type { WakaTimeSummaryDay } from '../../app/utils/wakatime'
import { describe, expect, it } from 'vitest'
import { activityAssetUrl, ActivityType, splitActivities } from '../../app/utils/discord'
import { summarizeWakaTime } from '../../app/utils/wakatime'

describe('activityAssetUrl', () => {
  it('resolves proxied external images', () => {
    expect(activityAssetUrl('mp:external/abc/https/example.com/a.png')).toBe('https://media.discordapp.net/external/abc/https/example.com/a.png')
  })

  it('resolves Spotify album art', () => {
    expect(activityAssetUrl('spotify:ab67616d0000b273')).toBe('https://i.scdn.co/image/ab67616d0000b273')
  })

  it('resolves application assets, which need the application id', () => {
    expect(activityAssetUrl('123', '456')).toBe('https://cdn.discordapp.com/app-assets/456/123.png')
    expect(activityAssetUrl('123')).toBeUndefined()
    expect(activityAssetUrl(undefined, '456')).toBeUndefined()
  })
})

describe('splitActivities', () => {
  const activity = (name: string, type: ActivityType): DiscordActivity => ({ id: name, name, type })
  const presence = (activities: DiscordActivity[], spotify = false): DiscordPresenceData => ({
    discord_status: 'online',
    active_on_discord_desktop: true,
    active_on_discord_mobile: false,
    listening_to_spotify: spotify,
    spotify: spotify ? { track_id: '1', song: 's', artist: 'a', album: 'al', album_art_url: null, timestamps: { start: 0, end: 1 } } : null,
    activities,
  })

  it('separates the custom status', () => {
    const { custom, others } = splitActivities(presence([activity('Custom Status', ActivityType.Custom), activity('Code', ActivityType.Playing)]))
    expect(custom?.name).toBe('Custom Status')
    expect(others.map(a => a.name)).toEqual(['Code'])
  })

  it('drops the Spotify activity only when the Spotify data is there', () => {
    const activities = [activity('Spotify', ActivityType.Listening), activity('Code', ActivityType.Playing)]
    expect(splitActivities(presence(activities, true)).others.map(a => a.name)).toEqual(['Code'])
    expect(splitActivities(presence(activities, false)).others.map(a => a.name)).toEqual(['Spotify', 'Code'])
  })
})

describe('summarizeWakaTime', () => {
  const day = (date: string, languages: [string, number][]): WakaTimeSummaryDay => ({
    range: { date },
    grand_total: { total_seconds: languages.reduce((sum, [, s]) => sum + s, 0) },
    languages: languages.map(([name, total_seconds]) => ({ name, total_seconds })),
  })

  it('totals the week and averages per day', () => {
    const week = summarizeWakaTime([day('2026-09-28', [['TypeScript', 3600]]), day('2026-09-29', [['Vue', 1800], ['TypeScript', 1800]])])
    expect(week.totalSeconds).toBe(7200)
    expect(week.dailyAverage).toBe(3600)
    expect(week.days).toEqual([{ date: '2026-09-28', seconds: 3600 }, { date: '2026-09-29', seconds: 3600 }])
  })

  it('sums languages across days, most used first, up to the limit', () => {
    const week = summarizeWakaTime([day('2026-09-28', [['TypeScript', 600], ['Vue', 300], ['CSS', 100]]), day('2026-09-29', [['Vue', 400]])], 2)
    expect(week.languages).toEqual([{ name: 'Vue', seconds: 700, percent: 50 }, { name: 'TypeScript', seconds: 600, percent: 43 }])
  })

  it('handles an empty week', () => {
    expect(summarizeWakaTime([])).toEqual({ totalSeconds: 0, dailyAverage: 0, days: [], languages: [] })
  })
})
