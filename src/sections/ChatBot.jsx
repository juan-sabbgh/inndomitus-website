import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { API_BASE_URL } from '../config/api'

const WELCOME_MESSAGE = {
  id: 0,
  rol: 'asistente',
  contenido:
    '¡Hola! 👋 Soy el asistente de Inndomitus. Estoy aquí para ayudarte a descubrir cómo la inteligencia artificial puede impulsar tu negocio.\n\n¿A qué se dedica tu empresa y qué retos estás enfrentando hoy?',
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="glass-card rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-slate-400"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isBot = msg.rol === 'asistente'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot
            ? 'bg-gradient-to-br from-cyan-500 to-violet-500'
            : 'bg-gradient-to-br from-violet-500 to-emerald-500'
        }`}
      >
        {isBot ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isBot
            ? 'glass-card rounded-bl-sm text-slate-200'
            : 'bg-gradient-to-br from-cyan-500/80 to-violet-500/80 rounded-br-sm text-white'
        }`}
      >
        {msg.contenido}
      </div>
    </motion.div>
  )
}

export default function ChatBot() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const texto = input.trim()
    if (!texto || loading) return

    const userMsg = { id: Date.now(), rol: 'usuario', contenido: texto }
    const historial = messages
      .filter((m) => m.id !== 0)
      .map((m) => ({ rol: m.rol, contenido: m.contenido }))

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: texto, historial }),
      })

      if (!res.ok) throw new Error()

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, rol: 'asistente', contenido: data.respuesta ?? data.mensaje ?? '...' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          rol: 'asistente',
          contenido:
            'Ups, tuve un problema al conectarme. Por favor intenta de nuevo o contáctanos directamente en el formulario de abajo. 🙏',
        },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <section id="agente" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/3 -left-40 w-80 h-80 border border-cyan-500/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/3 -right-40 w-96 h-96 border border-violet-500/10 rounded-full"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Agente IA</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-display mb-4"
          >
            <span className="text-white">¿Cómo podemos</span>
            <br />
            <span className="text-gradient">ayudar tu negocio?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Cuéntale a nuestro agente sobre tu empresa y descubre qué soluciones de IA se adaptan a tus necesidades.
          </motion.p>
        </div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl overflow-hidden flex flex-col"
          style={{ height: '520px' }}
        >
          {/* Top bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800/60">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Asistente Inndomitus</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-400">En línea</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <Message key={msg.id} msg={msg} />
              ))}
              {loading && <TypingIndicator key="typing" />}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-slate-800/60">
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                rows={1}
                className="flex-1 resize-none bg-slate-900/60 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors max-h-32"
                style={{ scrollbarWidth: 'none' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 text-white hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2 text-center">
              Presiona Enter para enviar · Shift+Enter para nueva línea
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
