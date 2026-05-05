import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaArrowUpRightFromSquare, FaChevronLeft, FaXmark } from 'react-icons/fa6'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import './WormholeTour.css'

const GITHUB  = 'chaudhrynihaal'
const FEATURED = ['hostel-finder', 'med-fast-AI-detection', 'stock-prediction-LSTM-RNN', 'n8n']
const COVERS  = {
  'hostel-finder':              '/project-covers/hostel-finder.png',
  'med-fast-AI-detection':      '/project-covers/med-fast-AI-detection.png',
  'stock-prediction-LSTM-RNN':  '/project-covers/stock-prediction-LSTM-RNN.png',
  'n8n':                        '/project-covers/n8n.png',
}

// ── WORMHOLE BACKGROUND ────────────────────────────
function WormholeTunnel({ targetZ }) {
  const tubeRef = useRef()
  const dustRef = useRef()
  const count = 6000
  const dustCount = 2000
  
  const curve = useMemo(() => {
    const points = []
    for (let i = 0; i < 20; i++) {
      points.push(new THREE.Vector3(
        Math.sin(i * 0.5) * 4,
        Math.cos(i * 0.5) * 4,
        -i * 20
      ))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    const colorA = new THREE.Color('#38bdf8')
    const colorB = new THREE.Color('#818cf8')
    const colorC = new THREE.Color('#c084fc')
    
    for (let i = 0; i < count; i++) {
      const t = Math.random()
      const angle = Math.random() * Math.PI * 2
      const p = curve.getPoint(t)
      const r = 1 + Math.random() * 6
      pos[i * 3] = p.x + Math.cos(angle) * r
      pos[i * 3 + 1] = p.y + Math.sin(angle) * r
      pos[i * 3 + 2] = p.z
      
      const mixedColor = colorA.clone().lerp(colorB, Math.random()).lerp(colorC, Math.random())
      cols[i * 3] = mixedColor.r
      cols[i * 3 + 1] = mixedColor.g
      cols[i * 3 + 2] = mixedColor.b
    }
    return { positions: pos, colors: cols }
  }, [curve])

  const dustPositions = useMemo(() => {
    const pos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      const t = Math.random()
      const angle = Math.random() * Math.PI * 2
      const p = curve.getPoint(t)
      const r = 8 + Math.random() * 12
      pos[i * 3] = p.x + Math.cos(angle) * r
      pos[i * 3 + 1] = p.y + Math.sin(angle) * r
      pos[i * 3 + 2] = p.z
    }
    return pos
  }, [curve])

  useFrame((state, delta) => {
    if (!tubeRef.current) return
    tubeRef.current.rotation.z += delta * 0.05
    if (dustRef.current) dustRef.current.rotation.z -= delta * 0.02
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ.current, 0.05)
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(state.clock.elapsedTime * 0.4) * 2, 0.1)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.cos(state.clock.elapsedTime * 0.4) * 2, 0.1)
    state.camera.lookAt(0, 0, state.camera.position.z - 40)
  })

  return (
    <group>
      <points ref={tubeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.12} vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dustCount} array={dustPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#4daafc" transparent opacity={0.3} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  )
}

function StarTunnel() {
  const starsRef = useRef()
  useFrame((state, delta) => {
    if (starsRef.current) starsRef.current.rotation.z += delta * 0.05
  })
  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={4000}
      factor={6}
      saturation={0}
      fade
      speed={2}
    />
  )
}

function FloatingNode({ position, title, children, stepKey, activeStep, onOpen }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <Html
      position={position}
      center
      distanceFactor={15}
      style={{
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: `scale(${hovered ? 1.2 : 1})`,
        pointerEvents: activeStep ? 'none' : 'auto',
        opacity: activeStep ? 0 : 1
      }}
    >
      <div 
        className={`floating-node-capsule ${hovered ? 'hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(stepKey)}
      >
        <div className="node-label">{title}</div>
        <div className="node-content-wrap">
          {children}
        </div>
        <div className="node-glow" />
      </div>
    </Html>
  )
}

function WormholeBackground({ children, targetZ }) {
  return (
    <div className="wormhole-bg">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 60 }}>
        <fogExp2 attach="fog" args={['#020817', 0.015]} />
        <WormholeTunnel targetZ={targetZ} />
        <StarTunnel />
        <pointLight position={[0, 0, 0]} intensity={3} color="#38bdf8" />
        <ambientLight intensity={0.5} />
        {children}
      </Canvas>
    </div>
  )
}

// ── APP ───────────────────────────────────────────────────────
export default function WormholeTour({ onExit }) {
  const [repos, setRepos] = useState([])
  const [activeStep, setActiveStep] = useState(null)
  const targetZ = useRef(10)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB}/repos?sort=updated&per_page=100`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRepos(data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleWheel = (e) => {
      if (activeStep) return
      targetZ.current -= e.deltaY * 0.2
      if (targetZ.current < -500) targetZ.current = 10
      if (targetZ.current > 10) targetZ.current = -500
    }
    const handleKey = (e) => {
      if (activeStep) return
      if (e.key === 'ArrowDown') targetZ.current -= 15
      if (e.key === 'ArrowUp')   targetZ.current += 15
      if (targetZ.current < -500) targetZ.current = 10
      if (targetZ.current > 10) targetZ.current = -500
    }
    window.addEventListener('wheel', handleWheel)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKey)
    }
  }, [activeStep])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveStep(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const featuredRepos = useMemo(() => {
    const map = new Map(repos.map(r => [r.name, r]))
    return FEATURED.map(n => map.get(n)).filter(Boolean)
  }, [repos])

  const activeRepo = repos.find(r => r.name === activeStep)

  return (
    <div className="wormhole-root">
      <header className="wormhole-header">
        <button className="exit-btn" onClick={onExit}>
          <FaChevronLeft /> Back to Portfolio
        </button>

        {activeStep && (
          <div className="header-right">
            <button className="close-btn" onClick={() => setActiveStep(null)}>
              <FaXmark />
            </button>
          </div>
        )}
      </header>

      <WormholeBackground targetZ={targetZ}>
        {[0, 1, 2].map(depthIdx => (
          FEATURED.map((name, i) => {
            const repo = featuredRepos.find(r => r.name === name) || { id: name, name: name }
            const basePositions = [
              [4, 2, -30],
              [-5, -1, -70],
              [4.5, -2.5, -110],
              [-3.5, 3.5, -150]
            ]
            const pos = [...basePositions[i]]
            pos[2] -= depthIdx * 150
            
            return (
              <FloatingNode 
                key={`${name}-${depthIdx}`}
                position={pos} 
                title="PROJECT" 
                activeStep={activeStep} 
                stepKey={name} 
                onOpen={() => setActiveStep(name)}
              >
                <div className="node-project-card">
                  <div className="node-project-img" style={{ backgroundImage: `url(${COVERS[name]})` }} />
                  <div className="node-project-info">
                    <h4>{repo.name.replace(/-/g, ' ')}</h4>
                    <p>View Details</p>
                  </div>
                </div>
              </FloatingNode>
            )
          })
        ))}
      </WormholeBackground>

      {activeStep && (
        <div className="modal" key={activeStep}>
          <button className="modal-back-btn" onClick={() => setActiveStep(null)} title="Back to tour">
            <FaChevronLeft />
          </button>
          <div className="modal-body">
            <section className="section-projects">
              <h1>{activeStep.replace(/-/g, ' ')}</h1>
              <div className="proj-modal-content">
                <div className="proj-large-img" style={{ backgroundImage: `url(${COVERS[activeStep]})` }} />
                <div className="proj-details">
                  <p className="proj-desc-long">
                    {activeRepo?.description || 'Advanced AI & Automation implementation focusing on high-scale efficiency and seamless integration.'}
                  </p>
                  <div className="proj-stats-mini">
                    <div className="p-stat"><strong>Stars</strong><span>{activeRepo?.stargazers_count || 0}</span></div>
                    <div className="p-stat"><strong>Language</strong><span>{activeRepo?.language || 'Python'}</span></div>
                  </div>
                  <button className="proj-cta-btn" onClick={() => activeRepo?.html_url && window.open(activeRepo.html_url, '_blank')}>
                    View on GitHub <FaArrowUpRightFromSquare />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
