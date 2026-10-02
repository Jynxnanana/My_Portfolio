export type SkillCategory = 'all' | 'frontend' | 'ui' | 'tools' | 'architecture' | 'backend' | 'database' | 'software' | 'mobile'

export interface Skill {
  name: string
  category: SkillCategory
  level: 'Expert' | 'Specialist' | 'Advanced' | 'Proficient' | 'Intermediate' | 'Academic' | 'Beginner'
  usage: string
  icon: string
}

export type ProjectTheme = 'goodside' | 'sonder' | 'morrow' | 'devpulse'

export interface Project {
  number: string
  name: string
  type: string
  tagline: string
  summary: string
  impact: string
  services: string[]
  theme: ProjectTheme
  demoUrl?: string
  repoUrl?: string
  highlights: string[]
}

export interface ExperienceItem {
  date: string
  role: string
  place: string
  copy: string
  tags: string[]
}

export interface CommandAction {
  id: string
  label: string
  icon?: string
  action: () => void
  section?: string
}
