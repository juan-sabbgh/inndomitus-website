import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
  Bot,
  Mic,
  Sparkles,
  DollarSign,
  Megaphone,
  HeadphonesIcon,
  ChevronRight,
  ArrowLeft,
  CreditCard,
  Calendar,
  ShoppingCart,
  Gift,
  AlertCircle,
  HelpCircle,
  Package,
  RotateCcw
} from 'lucide-react'
import { API_BASE_URL, ENDPOINTS } from '../config/api'

// Mensajes de WhatsApp por escenario
const whatsappMensajes = {
  cobranza: {
    pago_vencido: 'Hola, te contactamos de parte de nuestro equipo de cobranza. Tu factura venció hace 5 días. ¿Podemos ayudarte a regularizar tu pago hoy?',
    plan_pagos: 'Hola, notamos que tienes un saldo pendiente. Queremos ofrecerte opciones de pago en cuotas que se adapten a ti. ¿Te interesa conocerlas?',
    recordatorio_preventivo: 'Hola, te recordamos que tu próximo pago vence mañana. ¡Evita cargos adicionales pagando hoy! ¿Necesitas ayuda?',
  },
  marketing: {
    promo_exclusiva: '🎉 ¡Hola! Como cliente VIP tienes un 30% de descuento exclusivo esperándote. Válido solo por 48 horas. ¿Te gustaría aprovecharlo?',
    carrito_abandonado: 'Hola, vimos que dejaste productos en tu carrito. ¡Te ofrecemos envío gratis si completas tu compra hoy! ¿Quieres continuar?',
    upgrade_plan: 'Hola, notamos que aprovechas mucho tu plan actual. Tenemos una opción mejorada con precio especial para ti. ¿Te cuento los detalles?',
  },
  atencion_cliente: {
    estado_pedido: 'Hola, tu pedido #45821 está en camino. Aquí tienes el seguimiento en tiempo real. ¿Tienes alguna pregunta sobre tu entrega?',
    problema_servicio: 'Hola, recibimos tu reporte sobre problemas con el servicio. Estamos revisando tu caso y te ayudaremos a resolverlo de inmediato.',
    devolucion_producto: 'Hola, lamentamos que tu producto llegó dañado. Iniciamos el proceso de devolución por ti. ¿Prefieres reembolso o reposición del artículo?',
  },
}

function sanitizarNumero(numero) {
  // Elimina +, espacios, guiones y paréntesis
  return numero.replace(/[\s+\-()]/g, '')
}

// Tipos de agentes disponibles
const agentTypes = [
  {
    id: 'cobranza',
    title: 'Cobranza',
    description: 'Recuperación de pagos pendientes',
    icon: DollarSign,
    color: 'amber',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Promociones y ofertas personalizadas',
    icon: Megaphone,
    color: 'violet',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500',
    textColor: 'text-violet-400',
    iconBg: 'bg-violet-500/20',
  },
  {
    id: 'atencion_cliente',
    title: 'Atención al Cliente',
    description: 'Soporte y resolución de dudas',
    icon: HeadphonesIcon,
    color: 'cyan',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/20',
  },
]

// Escenarios por tipo de agente
const scenarios = {
  cobranza: [
    {
      id: 'pago_vencido',
      title: 'Pago Vencido',
      description: 'Tu factura de internet venció hace 5 días. El agente te contacta para recordarte y ayudarte a pagar.',
      icon: Calendar,
      context: 'Cliente con factura vencida de $450 MXN',
    },
    {
      id: 'plan_pagos',
      title: 'Plan de Pagos',
      description: 'Tienes una deuda acumulada y el agente te ofrece opciones de pago en cuotas.',
      icon: CreditCard,
      context: 'Cliente con deuda de $2,800 MXN - 3 meses',
    },
    {
      id: 'recordatorio_preventivo',
      title: 'Recordatorio Preventivo',
      description: 'Tu pago vence mañana. El agente te recuerda amablemente antes de que se generen cargos.',
      icon: AlertCircle,
      context: 'Pago próximo a vencer - $890 MXN',
    },
  ],
  marketing: [
    {
      id: 'promo_exclusiva',
      title: 'Promoción Exclusiva',
      description: 'Eres cliente VIP y hay un 30% de descuento solo para ti. El agente te cuenta los detalles.',
      icon: Gift,
      context: 'Cliente VIP - Promoción de temporada',
    },
    {
      id: 'carrito_abandonado',
      title: 'Carrito Abandonado',
      description: 'Dejaste productos en tu carrito hace 2 días. El agente te recuerda y ofrece envío gratis.',
      icon: ShoppingCart,
      context: 'Carrito con $1,200 MXN en productos',
    },
    {
      id: 'upgrade_plan',
      title: 'Upgrade de Plan',
      description: 'Usas mucho tu plan actual. El agente te sugiere uno mejor con precio especial.',
      icon: Sparkles,
      context: 'Cliente con alto uso mensual',
    },
  ],
  atencion: [
    {
      id: 'estado_pedido',
      title: 'Estado de Pedido',
      description: 'Compraste algo hace 3 días y quieres saber dónde está. El agente rastrea tu envío.',
      icon: Package,
      context: 'Pedido #45821 - En tránsito',
    },
    {
      id: 'problema_servicio',
      title: 'Problema con Servicio',
      description: 'Tu internet está lento. El agente diagnostica el problema y te ayuda a resolverlo.',
      icon: HelpCircle,
      context: 'Reporte de servicio lento',
    },
    {
      id: 'devolucion_producto',
      title: 'Devolución de Producto',
      description: 'El producto llegó dañado y necesitas devolverlo. El agente gestiona todo el proceso.',
      icon: RotateCcw,
      context: 'Solicitud de devolución - Producto dañado',
    },
  ],
}

// Canales de comunicación
const channels = [
  {
    id: 'voice',
    title: 'Llamada',
    description: 'Recibe una llamada del agente IA',
    icon: Mic,
  },
  {
    id: 'chat',
    title: 'WhatsApp',
    description: 'Recibe un mensaje de WhatsApp',
    icon: MessageSquare,
  },
]

export default function Demo() {
  const [step, setStep] = useState(1) // 1: tipo, 2: escenario, 3: canal, 4: teléfono
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const currentAgent = agentTypes.find((a) => a.id === selectedAgent)
  const currentScenarios = selectedAgent ? scenarios[selectedAgent] : []
  const currentScenario = currentScenarios.find((s) => s.id === selectedScenario)
  const currentChannel = channels.find((c) => c.id === selectedChannel)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Por favor ingresa un número válido')
      return
    }

    setIsSubmitting(true)

    try {
      const numero = sanitizarNumero(phoneNumber)

      const body = {
        numeroTelefono: numero,
        tipoAgente: selectedAgent,
        tipoEscenario: selectedScenario,
        canalContacto: selectedChannel,
        ...(selectedChannel === 'chat' && {
          mensaje: whatsappMensajes[selectedAgent]?.[selectedScenario] ?? 'Hola, te contactamos de parte de Inndomitus.',
        }),
      }

      const res = await fetch(`${API_BASE_URL}${ENDPOINTS.CONFIGURACION_AGENTE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.mensaje || 'Error al enviar la solicitud')
      }

      setIsSuccess(true)

      setTimeout(() => {
        resetDemo()
      }, 6000)
    } catch (err) {
      setError(err.message || 'Error al enviar la solicitud')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetDemo = () => {
    setIsSuccess(false)
    setStep(1)
    setSelectedAgent(null)
    setSelectedScenario(null)
    setSelectedChannel(null)
    setPhoneNumber('')
    setError('')
  }

  const goBack = () => {
    if (step === 2) {
      setSelectedAgent(null)
      setStep(1)
    } else if (step === 3) {
      setSelectedScenario(null)
      setStep(2)
    } else if (step === 4) {
      setSelectedChannel(null)
      setStep(3)
    }
  }

  const getColorClasses = () => {
    if (!currentAgent) return { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500' }
    const colors = {
      amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500', glow: 'shadow-amber-500/20' },
      violet: { bg: 'bg-violet-500', text: 'text-violet-400', border: 'border-violet-500', glow: 'shadow-violet-500/20' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500', glow: 'shadow-cyan-500/20' },
    }
    return colors[currentAgent.color]
  }

  const colors = getColorClasses()

  return (
    <section id="demo" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

      {/* Decorative Elements */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Prueba en Vivo</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
              Gratis
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6"
          >
            <span className="text-white">Experimenta el</span>{' '}
            <span className="text-gradient">Futuro</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg"
          >
            Elige un escenario real y prueba cómo nuestros agentes IA pueden
            transformar la comunicación con tus clientes.
          </motion.p>
        </div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= s
                    ? `${colors.bg} text-white`
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-12 h-0.5 mx-1 transition-all ${
                    step > s ? colors.bg : 'bg-slate-800'
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {/* Success State */}
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${currentAgent?.iconBg}`}
                  >
                    <CheckCircle className={`w-12 h-12 ${colors.text}`} />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {selectedChannel === 'voice' ? '¡Llamada en Camino!' : '¡Mensaje Enviado!'}
                  </h3>
                  <p className="text-slate-400 text-lg mb-4">
                    {selectedChannel === 'voice'
                      ? 'Recibirás una llamada en los próximos 30 segundos'
                      : 'Recibirás un mensaje de WhatsApp en breve'}
                  </p>
                  <div className="glass-card rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-sm text-slate-500 mb-1">Escenario seleccionado:</p>
                    <p className={`font-medium ${colors.text}`}>
                      {currentAgent?.title} → {currentScenario?.title}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Step 1: Select Agent Type */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-2 text-center">
                        ¿Qué tipo de agente quieres probar?
                      </h3>
                      <p className="text-slate-400 text-center mb-8">
                        Selecciona el área que te interesa explorar
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {agentTypes.map((agent) => {
                          const Icon = agent.icon
                          return (
                            <motion.button
                              key={agent.id}
                              onClick={() => {
                                setSelectedAgent(agent.id)
                                setStep(2)
                              }}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-6 rounded-2xl border-2 border-slate-700 bg-slate-900/30 hover:${agent.borderColor} hover:${agent.bgColor} transition-all duration-300 text-left group`}
                            >
                              <div className={`w-14 h-14 rounded-xl ${agent.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-7 h-7 ${agent.textColor}`} />
                              </div>
                              <h4 className="text-lg font-semibold text-white mb-1">
                                {agent.title}
                              </h4>
                              <p className="text-sm text-slate-400">
                                {agent.description}
                              </p>
                              <ChevronRight className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Select Scenario */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <button
                        onClick={goBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                      </button>

                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 rounded-xl ${currentAgent?.iconBg} flex items-center justify-center`}>
                          {currentAgent && <currentAgent.icon className={`w-5 h-5 ${currentAgent.textColor}`} />}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            Agente de {currentAgent?.title}
                          </h3>
                          <p className="text-sm text-slate-400">Elige un escenario de la vida real</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {currentScenarios.map((scenario) => {
                          const Icon = scenario.icon
                          return (
                            <motion.button
                              key={scenario.id}
                              onClick={() => {
                                setSelectedScenario(scenario.id)
                                setStep(3)
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`relative p-5 rounded-2xl border-2 border-slate-700 bg-slate-900/30 hover:${currentAgent?.borderColor} hover:${currentAgent?.bgColor} transition-all duration-300 text-left group`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl ${currentAgent?.iconBg} flex items-center justify-center shrink-0`}>
                                  <Icon className={`w-6 h-6 ${currentAgent?.textColor}`} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-white mb-1">
                                    {scenario.title}
                                  </h4>
                                  <p className="text-sm text-slate-400 mb-2">
                                    {scenario.description}
                                  </p>
                                  <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${currentAgent?.bgColor} ${currentAgent?.textColor}`}>
                                    {scenario.context}
                                  </span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all mt-3" />
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Select Channel */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <button
                        onClick={goBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                      </button>

                      {/* Selected scenario summary */}
                      <div className={`rounded-xl p-4 mb-8 ${currentAgent?.bgColor} border ${currentAgent?.borderColor}`}>
                        <div className="flex items-center gap-3">
                          {currentScenario && <currentScenario.icon className={`w-5 h-5 ${currentAgent?.textColor}`} />}
                          <div>
                            <p className="text-sm text-slate-400">Escenario:</p>
                            <p className="font-medium text-white">{currentScenario?.title}</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2 text-center">
                        ¿Cómo quieres recibir la demo?
                      </h3>
                      <p className="text-slate-400 text-center mb-8">
                        Elige tu canal preferido
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        {channels.map((channel) => {
                          const Icon = channel.icon
                          return (
                            <motion.button
                              key={channel.id}
                              onClick={() => {
                                setSelectedChannel(channel.id)
                                setStep(4)
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-6 rounded-2xl border-2 border-slate-700 bg-slate-900/30 hover:${currentAgent?.borderColor} hover:${currentAgent?.bgColor} transition-all duration-300 text-center group`}
                            >
                              <div className={`w-16 h-16 rounded-2xl ${currentAgent?.iconBg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-8 h-8 ${currentAgent?.textColor}`} />
                              </div>
                              <h4 className="text-lg font-semibold text-white mb-1">
                                {channel.title}
                              </h4>
                              <p className="text-sm text-slate-400">
                                {channel.description}
                              </p>
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Phone Number */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <button
                        onClick={goBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                      </button>

                      {/* Summary */}
                      <div className={`rounded-xl p-4 mb-8 ${currentAgent?.bgColor} border ${currentAgent?.borderColor}`}>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className={`font-medium ${currentAgent?.textColor}`}>{currentAgent?.title}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-300">{currentScenario?.title}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-300">{currentChannel?.title}</span>
                        </div>
                      </div>

                      <div className="max-w-md mx-auto">
                        <h3 className="text-xl font-semibold text-white mb-2 text-center">
                          ¡Último paso!
                        </h3>
                        <p className="text-slate-400 text-center mb-8">
                          Ingresa tu número para recibir la demo
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                            <label
                              htmlFor="phone"
                              className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3"
                            >
                              <Phone className="w-4 h-4" />
                              Tu Número de Teléfono
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => {
                                  setPhoneNumber(e.target.value)
                                  setError('')
                                }}
                                placeholder="+52 55 1234 5678"
                                className={`w-full px-5 py-4 rounded-xl bg-slate-900/50 border text-white text-lg placeholder-slate-500 focus:outline-none transition-colors ${
                                  error
                                    ? 'border-red-500 focus:border-red-500'
                                    : `border-slate-700 focus:${currentAgent?.borderColor}`
                                }`}
                              />
                              {selectedChannel === 'voice' ? (
                                <Mic className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              ) : (
                                <MessageSquare className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              )}
                            </div>
                            {error && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-2"
                              >
                                {error}
                              </motion.p>
                            )}
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full group relative px-8 py-4 rounded-xl text-base font-semibold text-white overflow-hidden transition-all disabled:opacity-70 disabled:cursor-not-allowed ${colors.bg} hover:shadow-xl ${colors.glow}`}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  {selectedChannel === 'voice' ? 'Iniciando Llamada...' : 'Enviando Mensaje...'}
                                </>
                              ) : (
                                <>
                                  {selectedChannel === 'voice' ? (
                                    <Phone className="w-5 h-5" />
                                  ) : (
                                    <Send className="w-5 h-5" />
                                  )}
                                  {selectedChannel === 'voice' ? 'Recibir Llamada' : 'Recibir Mensaje'}
                                  <Sparkles className="w-5 h-5" />
                                </>
                              )}
                            </span>
                          </button>

                          <p className="text-center text-xs text-slate-500">
                            Al continuar, aceptas recibir una demo de nuestro agente IA.
                            <br />
                            No almacenamos tu número después de la demostración.
                          </p>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-slate-500 text-sm"
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              100% Gratis
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Sin compromiso
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Datos seguros
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
