import type { Skill, Project } from '../types/portfolio'

export const skills: Skill[] = [
  { name: 'Vue.js & React', category: 'frontend', level: 'Advanced', usage: 'Interactive UI, Component Architecture', icon: '⚛️' },
  { name: 'Flutter & Dart', category: 'mobile', level: 'Intermediate', usage: 'Cross-platform mobile apps', icon: '📱' },
  { name: 'JavaScript / Node.js', category: 'backend', level: 'Advanced', usage: 'Server-side logic, APIs, Vanilla JS', icon: '🟢' },
  { name: 'PHP & MySQL', category: 'backend', level: 'Advanced', usage: 'Relational DBs, Server scripting', icon: '🐘' },
  { name: 'Java & Python', category: 'software', level: 'Intermediate', usage: 'OOP, Data Structures, Scripting', icon: '☕' },
  { name: 'Vite', category: 'tools', level: 'Advanced', usage: 'Fast builds, modern web tooling', icon: '⚡' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Advanced', usage: 'Modern fluid CSS, Design systems', icon: '🌊' },
  { name: 'Git & GitHub', category: 'tools', level: 'Advanced', usage: 'Version control, collaborative workflows', icon: '🐙' },
  { name: 'Computer Science', category: 'software', level: 'Academic', usage: 'Data Structures, Algorithms', icon: '📚' }
]

export const projects: Project[] = [
  {
    number: '01',
    name: 'CHCCI NFA LAB',
    type: 'Laboratory Information System',
    tagline: 'Streamlining lab operations',
    summary: 'A robust web application designed for CHCCI NFA lab management to handle records and tracking effectively.',
    impact: 'Improved record processing speed and accuracy',
    services: ['Vue.js', 'React', 'Tailwind CSS', 'Node.js'],
    theme: 'goodside',
    demoUrl: 'https://nfa-sage.vercel.app/',
    highlights: ['Robust authentication', 'Real-time database integration', 'Responsive UI']
  },
  {
    number: '02',
    name: 'CHCC BSED Portal',
    type: 'Education Portal & Management',
    tagline: 'Student/Faculty Academic Dashboard',
    summary: 'An academic portal crafted for the Education department at CHCC to streamline materials, modules, and grading.',
    impact: 'Seamless student-to-faculty workflow',
    services: ['Vue 3', 'PHP', 'MySQL', 'Tailwind'],
    theme: 'sonder',
    demoUrl: 'https://chcc-bsed-portal.onrender.com/',
    highlights: ['Secure session handling', 'Role-based access control', 'Fast loading times']
  },
  {
    number: '03',
    name: 'Personal Expenses Tracker',
    type: 'Mobile Finance Application',
    tagline: 'Track spending visually and easily',
    summary: 'A beautifully designed mobile app utilizing Flutter and Dart for real-time personal finance tracking, categorizing, and budgeting.',
    impact: 'Clean UI and native-like performance',
    services: ['Flutter', 'Dart', 'Mobile UI'],
    theme: 'morrow',
    highlights: ['Interactive charts', 'Offline state management', 'Cross-platform native compilation']
  }
]
