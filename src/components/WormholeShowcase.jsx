import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Image, Float, Text, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function ProjectCard({ url, title, index, total, link }) {
  const ref = useRef()
  const position = useMemo(() => {
    const angle = (index / total) * Math.PI * 6
    const radius = 6
    const z = -index * 25
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, z]
  }, [index, total])

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} 
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
        onClick={() => window.open(link, '_blank')}
      >
        <Image ref={ref} url={url} scale={[8, 5]} transparent opacity={0.9} />
        <Text position={[0, -3.2, 0.1]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">
          {title.toUpperCase()}
        </Text>
      </group>
    </Float>
  )
}

function StarTunnel() {
  const starsRef = useRef()
  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.z += 0.001
  })
  return <Stars ref={starsRef} radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={2} />
}

function Scene({ repos, projectCovers, progress }) {
  useFrame((state) => {
    const targetZ = -progress * (repos.length * 25 + 20)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1)
    state.camera.lookAt(0, 0, state.camera.position.z - 20)
  })

  return (
    <group>
      <StarTunnel />
      {repos.map((repo, i) => (
        <ProjectCard key={repo.id} url={projectCovers[repo.name]} title={repo.name} link={repo.html_url} index={i} total={repos.length} />
      ))}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#4daafc" />
      <ambientLight intensity={1} />
    </group>
  )
}

export default function WormholeShowcase({ repos, projectCovers }) {
  const containerRef = useRef()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const winHeight = window.innerHeight
      
      // The container is 300vh tall. 
      // We want progress=0 when the TOP of the container is at the TOP of the viewport.
      // We want progress=1 when the BOTTOM of the container is at the BOTTOM of the viewport.
      
      const totalScrollable = rect.height - winHeight
      const scrolled = -rect.top
      
      const p = Math.min(Math.max(scrolled / totalScrollable, 0), 1)
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!repos || repos.length === 0) return null

  return (
    <div ref={containerRef} className="wormhole-sticky-wrapper" style={{ height: '300vh', position: 'relative', marginTop: '100px' }}>
      <div className="wormhole-sticky-content" style={{ position: 'sticky', top: '0', height: '100vh', width: '100%', overflow: 'hidden', background: '#000' }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
          <Scene repos={repos} projectCovers={projectCovers} progress={progress} />
        </Canvas>
        <div style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '14px', letterSpacing: '4px', fontWeight: '800' }}>
          {progress < 0.99 ? 'SCROLL TO RIDE THROUGH PROJECTS' : 'RIDE COMPLETE'}
        </div>
      </div>
    </div>
  )
}




