import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from '../components/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 floor-glow" />

      {/* Subtle ambient orbs */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-slate-300">Elite Tech Squad</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-medium">
            6 Founders
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-display tracking-tight mb-6"
        >
          <span className="text-white">IA que</span>{' '}
          <span className="text-gradient">Escala</span>
          <br />
          <span className="text-white">tu Negocio</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed"
        >
          Construimos{' '}
          <span className="text-cyan-400 font-medium">agentes inteligentes</span>,{' '}
          <span className="text-violet-400 font-medium">chatbots</span> y{' '}
          <span className="text-slate-300 font-medium">software</span> que transforman
          la forma en que operas. Automatización que libera a tu equipo.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PrimaryButton href="#contacto">
            <Zap className="w-5 h-5" />
            Impulsa tu Negocio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </PrimaryButton>

          <SecondaryButton href="#servicios">
            Ver Servicios
          </SecondaryButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
