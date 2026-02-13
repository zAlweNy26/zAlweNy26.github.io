import type { RestEndpointMethodTypes } from '@octokit/rest'

export interface ProfessionalExperience {
  company: string
  companyUrl: string
  location: string
  position: string
  startDate: Date
  endDate?: Date
  description: string
  technologies: string[]
}

export type GitHubRepository = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][number]

export interface ContributionSummary {
  repoFullName: string
  repoUrl: string
  prCount: number
  lastPrUpdatedAt: string
  stars: number
  recentPrs: {
    title: string
    url: string
    updated_at: string
  }[]
}

export const professionalExperiences: ProfessionalExperience[] = [
  {
    company: 'Tinke',
    companyUrl: 'https://tinke.it',
    location: 'Remote',
    position: 'Lead Frontend Developer',
    startDate: new Date('2023-11-01'),
    description: `Serve as Lead Frontend Developer for the product **[Mimìr AI Agent](https://mimir.bot)**, overseeing frontend architecture and development while ensuring consistency with UX/UI design.
- Developed the web interface using **Nuxt.js** and **TypeScript**
- Coordinated with designers through **Figma** projects
- Introduced modern development practices (componentization, code reviews, CI/CD), improving code quality and scalability
- Created custom elements for seamless integration into clients webpages`,
    technologies: ['Vue 3', 'Nuxt 4', 'HTML5', 'CSS3', 'Tailwind 4', 'TypeScript', 'Docker', 'Bun'],
  },
  {
    company: 'Cheshire Cat AI',
    companyUrl: 'https://cheshirecat.ai',
    location: 'Remote',
    position: 'IT Consultant',
    startDate: new Date('2023-10-01'),
    endDate: new Date('2024-08-31'),
    description: `Contributed to the development of the open-source AI framework Cheshire Cat, providing technical support to clients and working on both the backend and the web dashboard.
- Acted as a Core Contributor to the framework written in **Python**
- Designed and developed the web dashboard using **Vue.js** and **Tailwind CSS**
- Assisted clients in integrating the framework into production environments`,
    technologies: ['Vue 3', 'HTML5', 'CSS3', 'Tailwind 3', 'TypeScript', 'Docker', 'Node.js', 'Python'],
  },
]

export interface EducationalExperience {
  institution: string
  degree: string
  startDate: Date
  endDate?: Date
  description: string
  skills: string[]
}

export const educationalExperiences: EducationalExperience[] = [
  {
    institution: 'University of Parma, Italy',
    degree: 'Bachelor\'s Degree in Computer Science',
    startDate: new Date('2025-10-01'),
    description: `After transferring from the University of Palermo, I am currently pursuing my Bachelor's degree in Computer Science at the University of Parma. My focus is on advanced topics in artificial intelligence, machine learning, and data science. I am engaged in coursework and projects that enhance my understanding of AI algorithms, data analysis techniques, and programming languages such as Python.`,
    skills: ['Artificial Intelligence', 'Machine Learning', 'Python'],
  },
  {
    institution: 'University of Palermo, Italy',
    degree: 'Bachelor\'s Degree in Computer Science',
    startDate: new Date('2020-10-01'),
    endDate: new Date('2025-08-31'),
    description: `My university studies provided me with a strong foundation in mathematics, theoretical computer science, and software technologies, combining both fundamental and applied perspectives. I completed core courses such as Data Structures and Algorithms, Programming in C and Java, Databases, Operating Systems, Computer Networks, Machine Learning, and Computer Vision, complemented by mathematical subjects like Calculus, Geometry, and Probability Theory. This academic background enabled me to develop strong skills in software development, data management, and problem-solving.`,
    skills: ['C', 'Java', 'SQL', 'Assembly', 'Data Structures & Algorithms', 'Operating Systems', 'Computer Networks'],
  },
  {
    institution: 'University of Debrecen, Hungary',
    degree: 'Erasmus+ Exchange Program',
    startDate: new Date('2023-02-24'),
    endDate: new Date('2023-06-24'),
    description: `As part of my Erasmus+ exchange, I attended advanced computer science courses focusing on software development, security, and emerging technologies. I successfully completed subjects such as Data Structures and Algorithms, Advanced Data Security, Blockchain Technology, Database Systems, and 3D Game Development, strengthening both my theoretical knowledge and practical skills.`,
    skills: ['Redis', 'Unity', 'C#', 'SolidWorks', '3D Printing', 'SQL', 'Cybersecurity', 'Blockchain'],
  },
  {
    institution: 'I.T.I.S. "Leonardo da Vinci", Trapani, Italy',
    degree: 'High School Diploma in Electronics and Telecommunications',
    startDate: new Date('2014-09-12'),
    endDate: new Date('2020-06-30'),
    description: `During my high school years, I focused on electronics and telecommunications, gaining a solid understanding of circuit design, signal processing, and communication systems. I participated in various projects, including building a radio transmitter and developing a basic home automation system.`,
    skills: ['Electronics', 'Circuit Design', 'Signal Processing', 'Telecommunications', 'C', 'Arduino'],
  },
]

export interface Certification {
  title: string
  issuer: string
  issueDate: Date
  url?: string
}

export const certifications: Certification[] = [
  {
    title: 'Certified Nuxt Master',
    issuer: 'Vue School',
    issueDate: new Date('2025-01-15'),
    url: 'https://api.masteringnuxt.com/certificates/9e17e882-c5bd-4d6c-890f-47e0ac943a01/download?signature=e5fc1a0d60f7bde92d985743c718a0a452dfa306924eef8e11d962157c3613fa',
  },
  {
    title: 'B2 English Language Proficiency',
    issuer: 'EF - Education First',
    issueDate: new Date('2017-10-10'),
  },
]

export const categorySkills = {
  'Languages': ['🇮🇹 Italian (Native)', '🇬🇧 English (B2)', '🇪🇸 Spanish (A2)'],
  'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3'],
  'Frontend Technologies': ['Vue 3', 'Nuxt 3/4', 'Tailwind CSS 3/4', 'Capacitor', 'Flutter'],
  'Backend Technologies': ['Node.js', 'Bun', 'Elysia', 'PostgreSQL', 'MySQL', 'BetterAuth'],
  'Security & DevOps': ['Docker', 'Kubernetes', 'Cloudflare', 'GitHub Actions', 'Digital Ocean'],
  'Tools': ['Git', 'Vitest', 'Playwright', 'Vite', 'ESLint', 'Playwright'],
}
