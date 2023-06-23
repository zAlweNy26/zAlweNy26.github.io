<script setup lang="ts">
//TODO: Inspired by https://github.com/arifszn/gitprofile

const ghNick = 'zAlweNy26'

const getStats = useMemoize(
  async (user: string) => {
    const { data } = await useFetch(`https://api.github.com/users/${user}`, {
      beforeFetch: ({ options }) => {
        options.headers = {
          ...options.headers,
          Accept: 'application/vnd.github.v3+json',
        }
      }
    }).get().json()
    return {
      avatar: data.value.avatar_url,
      name: data.value.name,
      bio: data.value.bio,
      location: data.value.location,
      company: data.value.company,
      email: data.value.email,
      hireable: data.value.hireable,
      followers: data.value.followers,
      following: data.value.following
    }
  }
)

const stats = await getStats(ghNick)

const getRepos = useMemoize(
  async (user: string, sort = 'stars', limit: number = 8) => {
    const query = `user:${user}+-repo:${user}/${user}&sort=${sort}&per_page=${limit}`
    const { data } = await useFetch(`https://api.github.com/search/repositories?q=${query}&type=Repositories`, {
      beforeFetch: ({ options }) => {
        options.headers = {
          ...options.headers,
          Accept: 'application/vnd.github.v3+json',
        }
      }
    }).get().json()
    return data.value.items
  }
)

const repos = await getRepos(ghNick)

const projects = [
  {
    name: 'Sensorify',
    description: 'An application that allows you to take advantage of all the sensors present in the device in which it is installed, allowing you to take measurements for what you need quickly and easily.',
    url: 'https://play.google.com/store/apps/details?id=it.alwe.sensorify',
    image: 'https://play-lh.googleusercontent.com/XyAfBsE6tPRowwgGpMmRchFco_dZNvb0aw7AIyjWk_Dcz079W4zS98T4cAHY3WH0WME=w240-h480-rw'
  },
  {
    name: 'Ambo',
    description: 'Digital bingo game, for when you don\'t feel like carrying the box! It also includes grimaces for some Italian regional dialects.',
    url: 'https://ambo-game.web.app',
    image: 'https://placehold.co/400'
  },
  {
    name: 'LivingDexTracker',
    description: 'Website for Pokemon collectors who want to keep track of their progress as they work to complete their Pokedex.',
    url: 'https://livingdextracker-fd.web.app',
    image: 'https://placehold.co/400'
  },
  {
    name: 'HobbyHub',
    description: 'App to track your hobbies all in one (Games, Books, TV Series, Movies, Anime, Comics, ecc...)',
    url: 'https://livingdextracker-fd.web.app',
    image: 'https://placehold.co/400'
  },
]
</script>

<template>
  <div class="grid grid-cols-1 lg:p-4 md:grid-cols-2 lg:grid-cols-[0.5fr_1fr] gap-4">
    <div class="flex flex-col gap-4">
      <ProfileCard
        :location="stats.location"
        :hireable="stats.hireable"
        :description="stats.bio"
        :avatar="stats.avatar"
        :followers="stats.followers"
        :following="stats.following"
      />
      <AboutCard />
      <ContactsCard
        :company="stats.company"
        :email="stats.email"
      />
      <TechCard />
      <ExperienceCard />
      <EducationCard />
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2 bg-base-200 p-4 rounded-2xl">
        <div class="flex justify-between items-center">
          <p class="text-xl font-semibold">GitHub Repositories</p>
          <a :href="`https://github.com/${ghNick}?tab=repositories`" class="link no-underline link-primary">See all</a>
        </div>
        <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <RepoCard v-for="repo in repos"
            :name="repo.name"
            :url="repo.html_url"
            :description="repo.description"
            :language="repo.language"
            :stars="repo.stargazers_count"
            :forks="repo.forks_count"
            :watchers="repo.watchers_count"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2 bg-base-200 p-4 rounded-2xl">
        <p class="text-xl font-semibold">Personal Projects</p>
        <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <ProjectCard v-for="project in projects"
            :name="project.name"
            :url="project.url"
            :description="project.description"
            :image="project.image"
          />
        </div>
      </div>
    </div>
  </div>
</template>
