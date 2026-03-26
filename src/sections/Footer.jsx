import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'
import logo from '../logo.jpeg'

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:hola@inndomitus.com' },
]

const footerLinks = [
  { name: 'Servicios', href: '#servicios' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Inndomitus" className="w-9 h-9 object-contain" />
              <span className="text-xl font-bold font-display text-gradient">
                Inndomitus
              </span>
            </a>
            <p className="text-slate-400 text-sm max-w-xs">
              Consultora de IA y Software. Transformamos empresas con
              inteligencia artificial y desarrollo de alto impacto.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:text-center"
          >
            <h4 className="text-sm font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:text-right"
          >
            <h4 className="text-sm font-semibold text-white mb-4">Síguenos</h4>
            <div className="flex gap-3 md:justify-end">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/30 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-500 text-sm">
            © {currentYear} Inndomitus. Todos los derechos reservados.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-rose-500" /> en Latinoamérica
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
