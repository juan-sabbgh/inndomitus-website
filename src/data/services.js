import { Mic, MessageSquareText, Globe, Lightbulb, Bot, Zap, Database, Shield } from 'lucide-react'

export const services = [
  {
    id: 1,
    title: 'Agentes de Voz',
    description: 'Asistentes de voz inteligentes que entienden contexto, manejan conversaciones naturales y ejecutan acciones en tiempo real.',
    icon: Mic,
    gradient: 'from-cyan-400 to-cyan-600',
    glowColor: 'cyan',
  },
  {
    id: 2,
    title: 'Chatbots IA',
    description: 'Chatbots de atención al cliente 24/7 que resuelven consultas, califican leads y escalan a humanos cuando es necesario.',
    icon: MessageSquareText,
    gradient: 'from-violet-400 to-violet-600',
    glowColor: 'violet',
  },
  {
    id: 3,
    title: 'Desarrollo Web',
    description: 'Aplicaciones web modernas, rápidas y escalables. Desde landing pages hasta plataformas SaaS complejas.',
    icon: Globe,
    gradient: 'from-emerald-400 to-emerald-600',
    glowColor: 'emerald',
  },
  {
    id: 4,
    title: 'Consultoría IA',
    description: 'Te ayudamos a identificar oportunidades de automatización y diseñar estrategias de implementación de IA.',
    icon: Lightbulb,
    gradient: 'from-amber-400 to-orange-500',
    glowColor: 'amber',
  },
  {
    id: 5,
    title: 'Automatización',
    description: 'Workflows inteligentes que conectan tus herramientas, eliminan tareas repetitivas y liberan a tu equipo.',
    icon: Zap,
    gradient: 'from-pink-400 to-rose-500',
    glowColor: 'pink',
  },
  {
    id: 6,
    title: 'Agentes Autónomos',
    description: 'Agentes de IA que toman decisiones, ejecutan tareas complejas y aprenden de cada interacción.',
    icon: Bot,
    gradient: 'from-blue-400 to-indigo-600',
    glowColor: 'blue',
  },
]

export const stats = [
  { value: '6', label: 'Fundadores' },
  { value: '+50', label: 'Proyectos IA' },
  { value: '99%', label: 'Uptime' },
  { value: '24/7', label: 'Soporte' },
]
