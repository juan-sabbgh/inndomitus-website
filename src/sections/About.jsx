import { motion } from 'framer-motion'
import { Users, Rocket, Heart, Shield, Target, Zap } from 'lucide-react'
import { founders, values } from '../data/team'
import TeamCarousel from '../components/TeamCarousel'

export default function About() {
  return (
    <section id="nosotros" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 -right-32 w-64 h-64 border border-violet-500/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/4 -left-32 w-96 h-96 border border-cyan-500/10 rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-300">The Squad</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6"
          >
            <span className="text-gradient">6 Fundadores.</span>
            <br />
            <span className="text-white">Una Misión.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg"
          >
            Un equipo de apasionados por la tecnología que decidió unirse para
            construir el futuro de las empresas con Inteligencia Artificial.
          </motion.p>
        </div>

        {/* Team Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 -mx-4 sm:-mx-6 lg:-mx-8"
        >
          <TeamCarousel />
        </motion.div>

        {/* Founders Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        >
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl p-5 text-center group cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {founder.emoji}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {founder.name}
              </h4>
              <p className="text-xs text-slate-500">
                {founder.role}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 mb-5">
                {index === 0 && <Target className="w-6 h-6 text-cyan-400" />}
                {index === 1 && <Zap className="w-6 h-6 text-violet-400" />}
                {index === 2 && <Shield className="w-6 h-6 text-emerald-400" />}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-display">
                {value.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <blockquote className="text-2xl lg:text-3xl font-display text-slate-300 italic max-w-3xl mx-auto">
            "No solo construimos software.{' '}
            <span className="text-gradient font-semibold not-italic">
              Construimos el futuro
            </span>{' '}
            de tu empresa."
          </blockquote>
          <p className="mt-4 text-slate-500 text-sm">— El equipo Inndomitus</p>
        </motion.div>
      </div>
    </section>
  )
}
