import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaArrowUpRightFromSquare, FaChevronLeft, FaXmark } from 'react-icons/fa6'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import './WormholeTour.css'

const GITHUB   = 'chaudhrynihaal'
const FEATURED = ['hostel-finder', 'med-fast-AI-detection', 'stock-prediction-LSTM-RNN', 'n8n', 'lead-generation-agent', 'zf-apparel']
const COVERS   = {
  'hostel-finder':             '/project-covers/hostel-finder.png',
  'med-fast-AI-detection':     '/project-covers/med-fast-AI-detection.png',
  'stock-prediction-LSTM-RNN': '/project-covers/stock-prediction-LSTM-RNN.png',
  'n8n':                       '/project-covers/n8n.png',
  'lead-generation-agent':     '/project-covers/lead-generation-agent.png',
  'zf-apparel':                '/project-covers/zf-apparel.png',
}
const BASE_POSITIONS = [
  [ 6,    3,   -30],
  [-6,   -2.5, -80],
  [ 6.5, -3.5, -130],
  [-6.5,  3.5, -180],
  [ 6,   -3,   -230],
  [-6,    2.5, -280],
]

// ── PARTICLE TUNNEL ────────────────────────────────────────────
function WormholeTunnel() {
  const tubeRef = useRef()
  const dustRef = useRef()
  const count      = 9000
  const dustCount  = 3500

  const curve = useMemo(() => {
    const pts = []
    for (let i = 0; i < 20; i++)
      pts.push(new THREE.Vector3(Math.sin(i * 0.5) * 4, Math.cos(i * 0.5) * 4, -i * 20))
    return new THREE.CatmullRomCurve3(pts)
  }, [])

  const { positions, colors } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#38bdf8'),
      new THREE.Color('#818cf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#f0abfc'),
      new THREE.Color('#67e8f9'),
    ]
    for (let i = 0; i < count; i++) {
      const t     = Math.random()
      const angle = Math.random() * Math.PI * 2
      const p     = curve.getPoint(t)
      const r     = 0.5 + Math.random() * 7
      pos[i * 3]     = p.x + Math.cos(angle) * r
      pos[i * 3 + 1] = p.y + Math.sin(angle) * r
      pos[i * 3 + 2] = p.z
      const c1  = palette[Math.floor(Math.random() * palette.length)]
      const c2  = palette[Math.floor(Math.random() * palette.length)]
      const mix = c1.clone().lerp(c2, Math.random())
      cols[i * 3] = mix.r; cols[i * 3 + 1] = mix.g; cols[i * 3 + 2] = mix.b
    }
    return { positions: pos, colors: cols }
  }, [curve])

  const dustPositions = useMemo(() => {
    const pos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      const t     = Math.random()
      const angle = Math.random() * Math.PI * 2
      const p     = curve.getPoint(t)
      const r     = 9 + Math.random() * 14
      pos[i * 3]     = p.x + Math.cos(angle) * r
      pos[i * 3 + 1] = p.y + Math.sin(angle) * r
      pos[i * 3 + 2] = p.z
    }
    return pos
  }, [curve])

  useFrame((_, delta) => {
    if (tubeRef.current) tubeRef.current.rotation.z += delta * 0.07
    if (dustRef.current) dustRef.current.rotation.z -= delta * 0.03
  })

  return (
    <group>
      <points ref={tubeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count}     array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={count}     array={colors}    itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.14} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dustCount} array={dustPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#4daafc" transparent opacity={0.3} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  )
}

// ── NEBULA BLOBS ───────────────────────────────────────────────
const NEBULA_DEFS = [
  { pos: [ 9,  5,  -55], color: '#c084fc' },
  { pos: [-7, -4, -105], color: '#38bdf8' },
  { pos: [ 6, -8, -165], color: '#818cf8' },
  { pos: [-9,  7, -225], color: '#f0abfc' },
  { pos: [ 4,  3, -285], color: '#67e8f9' },
]

function NebulaBlob({ pos, color }) {
  const ref   = useRef()
  const count = 2500
  const arr   = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = Math.pow(Math.random(), 0.4) * 18
      a[i * 3]     = pos[0] + Math.sin(phi) * Math.cos(theta) * r
      a[i * 3 + 1] = pos[1] + Math.sin(phi) * Math.sin(theta) * r * 0.5
      a[i * 3 + 2] = pos[2] + Math.cos(phi) * r * 0.25
    }
    return a
  }, [])
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.008 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={arr} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color={color} transparent opacity={0.13} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}

// ── CAMERA RIG ─────────────────────────────────────────────────
function CameraRig({ targetZ, warpingRef, velocityRef }) {
  const prevZ = useRef(10)
  useFrame((state, delta) => {
    const lerpSpeed = warpingRef.current ? 0.09 : 0.05
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ.current, lerpSpeed)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(state.clock.elapsedTime * 0.3) * 1.2, 0.06)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.cos(state.clock.elapsedTime * 0.3) * 1.2, 0.06)
    state.camera.lookAt(0, 0, state.camera.position.z - 40)

    const vel = Math.abs(state.camera.position.z - prevZ.current) / Math.max(delta, 0.001)
    velocityRef.current = THREE.MathUtils.lerp(velocityRef.current || 0, vel, 0.12)
    prevZ.current = state.camera.position.z

    const targetFOV = warpingRef.current
      ? 90
      : THREE.MathUtils.clamp(60 + velocityRef.current * 0.25, 60, 82)
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFOV, 0.06)
    state.camera.updateProjectionMatrix()
  })
  return null
}

// ── STARS ──────────────────────────────────────────────────────
function StarTunnel() {
  const ref = useRef()
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.04 })
  return <Stars ref={ref} radius={100} depth={50} count={5000} factor={7} saturation={0} fade speed={2} />
}

// ── FLOATING PROJECT NODE ──────────────────────────────────────
function FloatingNode({ position, stepKey, activeStep, onOpen, name, cover }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Html
      position={position}
      center
      distanceFactor={15}
      style={{
        transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
        transform: `scale(${hovered ? 1.12 : 1})`,
        pointerEvents: activeStep ? 'none' : 'auto',
        opacity: activeStep ? 0 : 1,
      }}
    >
      <div
        className={`floating-node-capsule${hovered ? ' hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(stepKey)}
      >
        <div className="node-project-card">
          <div className="node-project-img" style={{ backgroundImage: `url(${cover})` }} />
          <div className="node-project-info">
            <h4>{name.replace(/-/g, ' ')}</h4>
            <p>Click to explore</p>
          </div>
        </div>
        <div className="node-glow" />
      </div>
    </Html>
  )
}

// ── ROOT COMPONENT ─────────────────────────────────────────────
export default function WormholeTour({ onExit }) {
  const [repos,      setRepos]      = useState([])
  const [activeStep, setActiveStep] = useState(null)
  const [warping,    setWarping]    = useState(true)
  const [showNodes,  setShowNodes]  = useState(false)
  const [showHint,   setShowHint]   = useState(false)
  const targetZ     = useRef(10)
  const warpingRef  = useRef(true)
  const velocityRef = useRef(0)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB}/repos?sort=updated&per_page=100`)
      .then(r => r.json()).then(d => Array.isArray(d) && setRepos(d)).catch(() => {})
  }, [])

  // Warp intro — rush camera forward, then hand control to user
  useEffect(() => {
    targetZ.current = -80
    const t1 = setTimeout(() => {
      warpingRef.current = false
      setWarping(false)
      setShowNodes(true)
    }, 2000)
    const t2 = setTimeout(() => setShowHint(true), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const onWheel = (e) => {
      if (activeStep || warping) return
      targetZ.current = Math.max(-500, Math.min(10, targetZ.current - e.deltaY * 0.2))
    }
    const onKey = (e) => {
      if (activeStep || warping) return
      if (e.key === 'ArrowDown') targetZ.current = Math.max(-500, targetZ.current - 15)
      if (e.key === 'ArrowUp')   targetZ.current = Math.min(10,   targetZ.current + 15)
    }
    window.addEventListener('wheel', onWheel)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey) }
  }, [activeStep, warping])

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setActiveStep(null)
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const featuredRepos = useMemo(() => {
    const map = new Map(repos.map(r => [r.name, r]))
    return FEATURED.map(n => map.get(n)).filter(Boolean)
  }, [repos])

  const activeRepo = repos.find(r => r.name === activeStep)

  return (
    <div className="wormhole-root">
      {/* Cinematic overlays */}
      <div className="cin-vignette" />
      <div className="cin-scanlines" />
      <div className="cin-bars" />
      {warping && <div className="cin-warpflash" />}

      <header className={`wormhole-header${warping ? ' wh-hidden' : ''}`}>
        <button className="exit-btn" onClick={onExit}><FaChevronLeft /> Back to Portfolio</button>
        {activeStep && (
          <div className="header-right">
            <button className="close-btn" onClick={() => setActiveStep(null)}><FaXmark /></button>
          </div>
        )}
      </header>

      <div className="wormhole-bg">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 60 }}>
          <fogExp2 attach="fog" args={['#020817', 0.011]} />
          <WormholeTunnel />
          {NEBULA_DEFS.map((def, i) => <NebulaBlob key={i} {...def} />)}
          <StarTunnel />
          <CameraRig targetZ={targetZ} warpingRef={warpingRef} velocityRef={velocityRef} />
          <pointLight position={[0, 0,    0]} intensity={4} color="#38bdf8" />
          <pointLight position={[0, 0, -120]} intensity={3} color="#c084fc" />
          <ambientLight intensity={0.25} />

          {showNodes && [0, 1, 2].map(di =>
            FEATURED.map((name, i) => {
              const repo = featuredRepos.find(r => r.name === name) || { name }
              const pos  = [...BASE_POSITIONS[i]]; pos[2] -= di * 300
              return (
                <FloatingNode
                  key={`${name}-${di}`}
                  position={pos}
                  stepKey={name}
                  activeStep={activeStep}
                  onOpen={setActiveStep}
                  name={repo.name}
                  cover={COVERS[name]}
                />
              )
            })
          )}
        </Canvas>
      </div>

      {/* HUD */}
      {!activeStep && (
        <div className={`cin-hud${showHint ? ' cin-hud-visible' : ''}`}>
          <div className="cin-hud-line">◈ SCROLL TO NAVIGATE ◈</div>
          <div className="cin-hud-sub">{FEATURED.length} PROJECTS IN THE UNIVERSE</div>
        </div>
      )}

      {/* Project modal — single viewport, no scroll */}
      {activeStep && (
        <div className="modal" key={activeStep}>
          <div className="modal-topbar">
            <button className="modal-back-btn" onClick={() => setActiveStep(null)}>
              <FaChevronLeft />
            </button>
            <h2 className="modal-project-title">{activeStep.replace(/-/g, ' ')}</h2>
            <div className="modal-topbar-spacer" />
          </div>

          <div className="modal-viewport">
            <div className="modal-cover" style={{ backgroundImage: `url(${COVERS[activeStep]})` }} />
            <div className="modal-details">
              <p className="proj-desc-long">
                {activeRepo?.description || 'Advanced AI & Automation implementation focusing on high-scale efficiency and seamless integration.'}
              </p>
              <div className="proj-stats-mini">
                <div className="p-stat"><strong>{activeRepo?.stargazers_count ?? 0}</strong><span>Stars</span></div>
                <div className="p-stat"><strong>{activeRepo?.language || 'Python'}</strong><span>Language</span></div>
              </div>
              <button className="proj-cta-btn" onClick={() => activeRepo?.html_url && window.open(activeRepo.html_url, '_blank')}>
                View on GitHub <FaArrowUpRightFromSquare />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
