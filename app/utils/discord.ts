import type { GatewayActivity, PresenceUpdateReceiveStatus } from 'discord-api-types/v10'
import { ActivityType } from 'discord-api-types/v10'

export { ActivityType }

export type DiscordStatus = PresenceUpdateReceiveStatus

/** The activity fields the Worker sends (no party, buttons or secrets) */
export type DiscordActivity = Pick<GatewayActivity, 'id' | 'name' | 'type' | 'state' | 'details' | 'timestamps' | 'application_id' | 'assets' | 'emoji'>

export interface SpotifyPresence {
  track_id: string | null
  song: string
  artist: string
  album: string
  album_art_url: string | null
  timestamps: { start: number, end: number }
}

/** As the my-location Worker serves it (the same shape as Lanyard's) */
export interface DiscordPresenceData {
  discord_status: DiscordStatus
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  listening_to_spotify: boolean
  spotify: SpotifyPresence | null
  activities: DiscordActivity[]
}

/**
 * Image URL for an activity asset. Assets come in three forms: `mp:external/...` (proxied external images),
 * `spotify:<id>` (album art) or an asset id uploaded to the application.
 */
export function activityAssetUrl(asset: string | undefined, applicationId?: string) {
  if (!asset) return undefined
  if (asset.startsWith('mp:')) return `https://media.discordapp.net/${asset.slice(3)}`
  if (asset.startsWith('spotify:')) return `https://i.scdn.co/image/${asset.slice(8)}`
  if (applicationId) return `https://cdn.discordapp.com/app-assets/${applicationId}/${asset}.png`
  return undefined
}

/** The custom status apart, and the Spotify activity left out: the Worker sends richer data for it in `spotify` */
export function splitActivities(presence: DiscordPresenceData) {
  const custom = presence.activities.find(activity => activity.type === ActivityType.Custom)
  const others = presence.activities.filter(activity =>
    activity.type !== ActivityType.Custom && !(presence.spotify && activity.name === 'Spotify' && activity.type === ActivityType.Listening))
  return { custom, others }
}
