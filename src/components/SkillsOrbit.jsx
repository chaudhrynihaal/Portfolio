import { cloneElement, useMemo } from 'react'

const ORB_CENTER = { x: 50, y: 60 }
const CONVERGE = { x: 50, y: 54 }

// Two compact rows forming a narrow cone directly above the orb.
const FAN_ROWS = [
  { y: 12, xs: [33, 40.2, 47.4, 54.6, 61.8, 69] }, // 6 icons
  { y: 22, xs: [37, 44, 50, 56, 63] },             // 5 icons
]
const FAN_SLOTS = FAN_ROWS.flatMap((row) => row.xs.map((x) => ({ x, y: row.y })))

// 3 thin nested elliptical rings.
const RINGS = [
  { rx: 22, ry: 7.5, angles: [200, 340] },
  { rx: 31, ry: 10.5, angles: [160, 20, 270] },
  { rx: 40, ry: 14, angles: [180, 0, 235, 305] },
]

function polar(cx, cy, rx, ry, deg) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + rx * Math.cos(rad), y: cy + ry * Math.sin(rad) }
}

function SkillsOrbit({ skills }) {
  const uniqueSkills = useMemo(() => {
    const seen = new Map()
    skills.forEach((s) => {
      if (!seen.has(s.label)) seen.set(s.label, s)
    })
    return [...seen.values()]
  }, [skills])

  const fanSkills = uniqueSkills.slice(0, FAN_SLOTS.length)
  let ringPool = uniqueSkills.slice(FAN_SLOTS.length)

  return (
    <div className="skills-orbit">
      <svg className="skills-orbit-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {fanSkills.map((skill, i) => {
          const pos = FAN_SLOTS[i]
          return (
            <line
              key={skill.label}
              x1={pos.x}
              y1={pos.y}
              x2={CONVERGE.x}
              y2={CONVERGE.y}
              className="skills-orbit-line"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          )
        })}
      </svg>

      {fanSkills.map((skill, i) => {
        const pos = FAN_SLOTS[i]
        return (
          <span
            key={skill.label}
            className="orbit-fan-icon"
            title={skill.label}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          >
            {skill.icon}
          </span>
        )
      })}

      {RINGS.map((ring, ri) => (
        <div
          key={`ring-${ri}`}
          className="orbit-ring"
          style={{
            left: `${ORB_CENTER.x}%`,
            top: `${ORB_CENTER.y}%`,
            width: `${ring.rx * 2}%`,
            height: `${ring.ry * 2}%`,
          }}
        />
      ))}

      {RINGS.flatMap((ring, ri) =>
        ring.angles.map((angle, ai) => {
          const skill = ringPool.shift()
          if (!skill) return null
          const pos = polar(ORB_CENTER.x, ORB_CENTER.y, ring.rx, ring.ry, angle)
          return (
            <span
              key={`ringicon-${ri}-${ai}`}
              className="orbit-ring-icon"
              title={skill.label}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {cloneElement(skill.icon, {
                style: { color: 'rgba(196, 161, 255, 0.55)' },
              })}
            </span>
          )
        }),
      )}

      <div className="orbit-core" style={{ left: `${ORB_CENTER.x}%`, top: `${ORB_CENTER.y}%` }}>
        <div className="orbit-core-glow" />
        <div className="orbit-core-mark">CN</div>
      </div>
    </div>
  )
}

export default SkillsOrbit
