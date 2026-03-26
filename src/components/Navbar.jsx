import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import logo from '../logo.jpeg'

const navLinks = [
  { name: 'Servicios', href: '#servicios' },
  { name: 'Demo', href: '#demo' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="Inndomitus"
              className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold font-display tracking-tight">
              <span className="text-gradient">Inndomitus</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacto"
              className="group relative px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 text-sm font-semibold text-slate-950 overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-400/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Hablemos
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 border-t border-slate-800"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white transition-colors text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 text-sm font-semibold text-slate-950"
              >
                <Sparkles className="w-4 h-4" />
                Hablemos
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
