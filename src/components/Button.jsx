import { motion } from 'framer-motion'

export function PrimaryButton({ children, href, className = '' }) {
  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 text-base font-semibold text-slate-950 overflow-hidden transition-all hover:shadow-xl hover:shadow-cyan-400/30 ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Component>
  )
}

export function SecondaryButton({ children, href, className = '' }) {
  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-700 text-base font-semibold text-white overflow-hidden transition-all hover:border-cyan-500/50 hover:bg-slate-900/50 ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </Component>
  )
}

export function GlowButton({ children, href, glowColor = 'cyan', className = '' }) {
  const Component = href ? motion.a : motion.button

  const glowClasses = {
    cyan: 'hover:shadow-cyan-500/30 border-cyan-500/30',
    violet: 'hover:shadow-violet-500/30 border-violet-500/30',
    emerald: 'hover:shadow-emerald-500/30 border-emerald-500/30',
  }

  return (
    <Component
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border bg-slate-900/50 backdrop-blur text-sm font-medium text-white transition-all hover:shadow-lg ${glowClasses[glowColor]} ${className}`}
    >
      {children}
    </Component>
  )
}
