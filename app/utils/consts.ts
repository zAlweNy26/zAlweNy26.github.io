export type Locale = 'en' | 'it'

/** Text that differs per language; plain strings (names, technologies) are the same in every language */
export type Localized = Record<Locale, string>
export type LocalizedText = string | Localized

export const localize = (text: LocalizedText, locale: Locale) => typeof text === 'string' ? text : text[locale]

export interface ProfessionalExperience<T = LocalizedText> {
  company: string
  companyUrl: string
  location: T
  position: T
  startDate: Date
  endDate?: Date
  /** Markdown */
  description: T
  technologies: string[]
}

export const professionalExperiences: ProfessionalExperience[] = [
  {
    company: 'Tinke',
    companyUrl: 'https://tinke.it',
    location: { en: 'Remote', it: 'Da remoto' },
    position: 'Lead Frontend Developer',
    startDate: new Date('2023-11-01'),
    description: {
      en: `Serve as Lead Frontend Developer for the product **[Mimìr AI Agent](https://mimir.bot)**, overseeing frontend architecture and development while ensuring consistency with UX/UI design.
- Developed the web interface using **Nuxt.js** and **TypeScript**
- Coordinated with designers through **Figma** projects
- Introduced modern development practices (componentization, code reviews, CI/CD), improving code quality and scalability
- Created custom elements for seamless integration into clients webpages`,
      it: `Lead Frontend Developer per il prodotto **[Mimìr AI Agent](https://mimir.bot)**, con la responsabilità dell'architettura e dello sviluppo frontend e della coerenza con il design UX/UI.
- Sviluppato l'interfaccia web con **Nuxt.js** e **TypeScript**
- Coordinato il lavoro con i designer tramite progetti **Figma**
- Introdotto pratiche di sviluppo moderne (componentizzazione, code review, CI/CD), migliorando qualità e scalabilità del codice
- Realizzato custom element per un'integrazione semplice nelle pagine web dei clienti`,
    },
    technologies: ['Vue 3', 'Nuxt 4', 'HTML5', 'CSS3', 'Tailwind 4', 'TypeScript', 'Docker', 'Bun'],
  },
  {
    company: 'Cheshire Cat AI',
    companyUrl: 'https://cheshirecat.ai',
    location: { en: 'Remote', it: 'Da remoto' },
    position: { en: 'IT Consultant', it: 'Consulente IT' },
    startDate: new Date('2023-10-01'),
    endDate: new Date('2024-08-31'),
    description: {
      en: `Contributed to the development of the open-source AI framework Cheshire Cat, providing technical support to clients and working on both the backend and the web dashboard.
- Acted as a Core Contributor to the framework written in **Python**
- Designed and developed the web dashboard using **Vue.js** and **Tailwind CSS**
- Assisted clients in integrating the framework into production environments`,
      it: `Ho contribuito allo sviluppo del framework AI open source Cheshire Cat, fornendo supporto tecnico ai clienti e lavorando sia sul backend che sulla dashboard web.
- Core Contributor del framework, scritto in **Python**
- Progettato e sviluppato la dashboard web con **Vue.js** e **Tailwind CSS**
- Supportato i clienti nell'integrazione del framework in ambienti di produzione`,
    },
    technologies: ['Vue 3', 'HTML5', 'CSS3', 'Tailwind 3', 'TypeScript', 'Docker', 'Node.js', 'Python'],
  },
]

export interface EducationalExperience<T = LocalizedText> {
  institution: T
  degree: T
  startDate: Date
  endDate?: Date
  /** Markdown */
  description: T
  skills: T[]
}

export const educationalExperiences: EducationalExperience[] = [
  {
    institution: { en: 'University of Parma, Italy', it: 'Università degli Studi di Parma' },
    degree: { en: 'Bachelor\'s Degree in Computer Science', it: 'Laurea triennale in Informatica' },
    startDate: new Date('2025-10-01'),
    description: {
      en: `After transferring from the University of Palermo, I am currently pursuing my Bachelor's degree in Computer Science at the University of Parma. My focus is on advanced topics in artificial intelligence, machine learning, and data science. I am engaged in coursework and projects that enhance my understanding of AI algorithms, data analysis techniques, and programming languages such as Python.`,
      it: `Dopo il trasferimento dall'Università di Palermo, sto proseguendo la laurea triennale in Informatica all'Università di Parma. Mi concentro su temi avanzati di intelligenza artificiale, machine learning e data science, con corsi e progetti che approfondiscono gli algoritmi di AI, le tecniche di analisi dei dati e linguaggi come Python.`,
    },
    skills: [
      { en: 'Artificial Intelligence', it: 'Intelligenza artificiale' },
      'Machine Learning',
      'Python',
      { en: 'Micro services', it: 'Microservizi' },
    ],
  },
  {
    institution: { en: 'University of Debrecen, Hungary', it: 'Università di Debrecen, Ungheria' },
    degree: { en: 'Erasmus+ Exchange Program', it: 'Programma di scambio Erasmus+' },
    startDate: new Date('2023-02-24'),
    endDate: new Date('2023-06-24'),
    description: {
      en: `As part of my Erasmus+ exchange, I attended advanced computer science courses focusing on software development, security, and emerging technologies. I successfully completed subjects such as Data Structures and Algorithms, Advanced Data Security, Blockchain Technology, Database Systems, and 3D Game Development, strengthening both my theoretical knowledge and practical skills.`,
      it: `Durante lo scambio Erasmus+ ho frequentato corsi avanzati di informatica su sviluppo software, sicurezza e tecnologie emergenti. Ho superato esami come Strutture dati e algoritmi, Sicurezza dei dati avanzata, Tecnologia blockchain, Basi di dati e Sviluppo di giochi 3D, rafforzando sia le conoscenze teoriche che le competenze pratiche.`,
    },
    skills: [
      'Redis',
      'Unity',
      'C#',
      'SolidWorks',
      { en: '3D Printing', it: 'Stampa 3D' },
      'SQL',
      { en: 'Cybersecurity', it: 'Sicurezza informatica' },
      'Blockchain',
      'Tinkercad',
    ],
  },
  {
    institution: { en: 'University of Palermo, Italy', it: 'Università degli Studi di Palermo' },
    degree: { en: 'Bachelor\'s Degree in Computer Science', it: 'Laurea triennale in Informatica' },
    startDate: new Date('2020-10-01'),
    endDate: new Date('2025-08-31'),
    description: {
      en: `My university studies provided me with a strong foundation in mathematics, theoretical computer science, and software technologies, combining both fundamental and applied perspectives. I completed core courses such as Data Structures and Algorithms, Programming in C and Java, Databases, Operating Systems, Computer Networks and Geometry. This academic background enabled me to develop strong skills in software development, data management, and problem-solving.`,
      it: `Gli studi universitari mi hanno dato una solida base in matematica, informatica teorica e tecnologie software, unendo aspetti fondamentali e applicati. Ho superato corsi fondamentali come Strutture dati e algoritmi, Programmazione in C e Java, Basi di dati, Sistemi operativi, Reti di calcolatori e Geometria, sviluppando solide competenze nello sviluppo software, nella gestione dei dati e nel problem solving.`,
    },
    skills: [
      'C',
      'Java',
      'SQL',
      'Assembly',
      { en: 'Data Structures & Algorithms', it: 'Strutture dati e algoritmi' },
      { en: 'Operating Systems', it: 'Sistemi operativi' },
      { en: 'Computer Networks', it: 'Reti di calcolatori' },
    ],
  },
  {
    institution: { en: 'I.T.I.S. "Leonardo da Vinci", Trapani, Italy', it: 'I.T.I.S. "Leonardo da Vinci", Trapani' },
    degree: { en: 'High School Diploma in Electronics and Telecommunications', it: 'Diploma di perito in Elettronica e Telecomunicazioni' },
    startDate: new Date('2014-09-12'),
    endDate: new Date('2020-06-30'),
    description: {
      en: `During my high school years, I focused on electronics and telecommunications, gaining a solid understanding of circuit design, signal processing, and communication systems. I participated in various projects, including building a radio transmitter and developing a basic home automation system.`,
      it: `Alle superiori mi sono specializzato in elettronica e telecomunicazioni, acquisendo una buona conoscenza di progettazione di circuiti, elaborazione dei segnali e sistemi di comunicazione. Ho partecipato a diversi progetti, tra cui la costruzione di un trasmettitore radio e lo sviluppo di un semplice sistema di domotica.`,
    },
    skills: [
      { en: 'Electronics', it: 'Elettronica' },
      { en: 'Circuit Design', it: 'Progettazione di circuiti' },
      { en: 'Signal Processing', it: 'Elaborazione dei segnali' },
      { en: 'Telecommunications', it: 'Telecomunicazioni' },
      'C',
      'Arduino',
    ],
  },
]

export interface Certification<T = LocalizedText> {
  title: T
  issuer: string
  issueDate: Date
  url?: string
}

export const certifications: Certification[] = [
  {
    title: 'Certified Nuxt Full Stack Master',
    issuer: 'Vue School',
    issueDate: new Date('2026-05-02'),
    url: 'https://api.masteringnuxt.com/certificates/a1af8ddf-d3e7-446e-a0eb-8b11f1fb762e/download?signature=819482228342290146bec13c15113a1214f1e27c3b5b6ae6339a18c74ab1e476',
  },
  {
    title: 'Certified Nuxt 3 Master',
    issuer: 'Vue School',
    issueDate: new Date('2025-01-15'),
    url: 'https://api.masteringnuxt.com/certificates/9e17e882-c5bd-4d6c-890f-47e0ac943a01/download?signature=e5fc1a0d60f7bde92d985743c718a0a452dfa306924eef8e11d962157c3613fa',
  },
  {
    title: { en: 'B2 English Language Proficiency', it: 'Certificazione di inglese B2' },
    issuer: 'EF - Education First',
    issueDate: new Date('2017-10-10'),
  },
]

/** Keys are message keys under `skills.` in i18n/locales */
export const categorySkills: Record<string, LocalizedText[]> = {
  languages: [
    { en: '🇮🇹 Italian (Native)', it: '🇮🇹 Italiano (madrelingua)' },
    { en: '🇬🇧 English (B2)', it: '🇬🇧 Inglese (B2)' },
    { en: '🇪🇸 Spanish (A1)', it: '🇪🇸 Spagnolo (A1)' },
  ],
  programming: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3'],
  frontend: ['Vue 3', 'Nuxt 3/4', 'Tailwind CSS 3/4', 'Capacitor', 'Flutter'],
  backend: ['Node.js', 'Bun', 'Elysia', 'PostgreSQL', 'MySQL', 'BetterAuth'],
  devops: ['Docker', 'Kubernetes', 'Cloudflare', 'GitHub Actions', 'Digital Ocean'],
  tools: ['Git', 'Vitest', 'Playwright', 'Vite', 'ESLint'],
}

const sicily = '<span class="bg-clip-text text-transparent font-bold bg-linear-[45deg,#fff100_50%,#ed141e_50%]">'
const italy = '<strong class="bg-clip-text text-transparent font-bold bg-linear-[90deg,#009246_33%,#ffffff_33%,#ffffff_61%,#ce2b37_61%]">'

/** Markdown with inline HTML for the flag-coloured words; `{age}` is filled in at render time */
export const aboutStory: Localized = {
  en: `I'm **{age}** years old born in ${sicily}Sicily</span>, ${italy}Italy</strong>. I first discovered the magical world of programming at the age of **12**. Obviously the first programs I did were nothing special (Visual Basic in my ❤️), but it was thanks to my consistency that I understood that programming was something else, something more powerful than this.

I tried many programming languages over the years, from **C** to **Java**, from **C#** to **Kotlin**, but the one that really fascinated me was **JavaScript**, the language of the web. I fell in love with the idea of being able to create something that could be used by anyone, anywhere in the world, just by opening a browser.

After mastering the basics of web development, I started to explore the world of frameworks, discovering **Vue.js** which I fell in love with immediately due to its simplicity and flexibility. Since then, I have been using it for every one of my projects. 💚`,
  it: `Ho **{age}** anni e sono nato in ${sicily}Sicilia</span>, ${italy}Italia</strong>. Ho scoperto il magico mondo della programmazione a **12** anni. Ovviamente i primi programmi che ho scritto non erano niente di speciale (Visual Basic nel mio ❤️), ma è stato grazie alla costanza che ho capito che programmare era qualcosa di diverso, qualcosa di molto più potente.

Negli anni ho provato tanti linguaggi, dal **C** al **Java**, dal **C#** al **Kotlin**, ma quello che mi ha davvero affascinato è stato **JavaScript**, il linguaggio del web. Mi sono innamorato dell'idea di poter creare qualcosa che chiunque, ovunque nel mondo, può usare semplicemente aprendo un browser.

Dopo aver imparato le basi dello sviluppo web ho iniziato a esplorare il mondo dei framework, scoprendo **Vue.js**, di cui mi sono innamorato subito per la sua semplicità e flessibilità. Da allora lo uso in ogni mio progetto. 💚`,
}

/** Printed instead of the story: a CV needs a short professional summary */
export const aboutSummary: Localized = {
  en: 'Developer with a lifelong passion for programming and a curiosity that led me through many languages before finding my home on the web. I value simplicity, clean code and consistent design, and I like building things that anyone can use just by opening a browser.',
  it: 'Sviluppatore con una passione per la programmazione che dura da sempre e una curiosità che mi ha portato a esplorare molti linguaggi prima di trovare la mia strada nel web. Credo nella semplicità, nel codice pulito e nel design coerente, e mi piace creare cose che chiunque può usare semplicemente aprendo un browser.',
}

export interface SocialLink {
  label: string
  icon: string
  to: string
}

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', icon: 'i-hugeicons-linkedin-02', to: 'https://linkedin.com/in/daniele-nicosia' },
  { label: 'GitHub', icon: 'i-hugeicons-github', to: 'https://github.com/zAlweNy26' },
  { label: 'Instagram', icon: 'i-hugeicons-instagram', to: 'https://www.instagram.com/dany_alwe' },
  { label: 'PayPal', icon: 'i-hugeicons-paypal', to: 'https://paypal.me/danyalwe' },
]
