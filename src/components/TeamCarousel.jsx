import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { teamMembers } from '../data/team'

import juanPhoto from '../juan_alberto_calderon_sabbagh.jpeg'
import diegoPhoto from '../diego_rosas_cruz.jpeg'
import eduardoPhoto from '../eduardo_hinojosa_casillas.jpeg'
import luisPhoto from '../luis_garcia_lopez.jpeg'
import aronPhoto from '../aron_alejandro_villeda_patricio.jpeg'
import alvaroPhoto from '../alvaro_david_montero_barraza.jpeg'

const photos = {
  juan_alberto_calderon_sabbagh: juanPhoto,
  diego_rosas_cruz: diegoPhoto,
  eduardo_hinojosa_casillas: eduardoPhoto,
  luis_garcia_lopez: luisPhoto,
  aron_alejandro_villeda_patricio: aronPhoto,
  alvaro_david_montero_barraza: alvaroPhoto,
}

const total = teamMembers.length
// Clone first and last slide for infinite loop
const slides = [teamMembers[total - 1], ...teamMembers, teamMembers[0]]

export default function TeamCarousel() {
  const controls = useAnimation()
  const containerRef = useRef(null)
  const currentRef = useRef(1) // index within `slides` array (1 = first real slide)
  const [realIndex, setRealIndex] = useState(0) // index within `teamMembers` (for dots)
  const isAnimating = useRef(false)

  // Keep track of current width for position recalculations
  const widthRef = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      widthRef.current = el.offsetWidth
      controls.set({ x: -currentRef.current * el.offsetWidth })
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [controls])

  const goTo = useCallback(
    async (index) => {
      if (isAnimating.current) return
      isAnimating.current = true

      const w = widthRef.current
      currentRef.current = index

      // Update dot indicator
      const ri =
        index === 0
          ? total - 1
          : index === slides.length - 1
          ? 0
          : index - 1
      setRealIndex(ri)

      await controls.start({
        x: -index * w,
        transition: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
      })

      // Infinite jump: clone reached → silently jump to real counterpart
      if (index === slides.length - 1) {
        controls.set({ x: -1 * w })
        currentRef.current = 1
        setRealIndex(0)
      } else if (index === 0) {
        controls.set({ x: -total * w })
        currentRef.current = total
        setRealIndex(total - 1)
      }

      isAnimating.current = false
    },
    [controls]
  )

  const next = useCallback(() => goTo(currentRef.current + 1), [goTo])
  const prev = useCallback(() => goTo(currentRef.current - 1), [goTo])

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  // Swipe / mouse drag detection
  const pointerStart = useRef(null)

  const handlePointerDown = (e) => {
    pointerStart.current = e.clientX
  }

  const handlePointerUp = (e) => {
    if (pointerStart.current === null) return
    const diff = pointerStart.current - e.clientX
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev()
    }
    pointerStart.current = null
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <motion.div className="flex" animate={controls}>
        {slides.map((member, index) => (
          <div
            key={`${member.id}-${index}`}
            className="min-w-full flex flex-col md:flex-row md:h-[520px]"
          >
            {/* Photo */}
            <div className="w-full md:w-2/5 h-72 md:h-full overflow-hidden">
              <img
                src={photos[member.photo]}
                alt={member.name}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-16 glass">
              <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
                {member.role}
              </p>
              <h3 className="text-white font-bold font-display text-3xl md:text-4xl mb-6 leading-tight">
                {member.name}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed max-w-lg">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {teamMembers.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i + 1)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === realIndex
                ? 'bg-cyan-400 w-6'
                : 'bg-slate-600 hover:bg-slate-400 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
