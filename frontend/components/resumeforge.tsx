/* eslint-disable react/no-unknown-property */
'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect, memo, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import {
  Text,
  Float,
  MeshTransmissionMaterial,
  Environment,
  Lightformer
} from '@react-three/drei';
import { useSession } from 'next-auth/react';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

/* ─────────────────────────────────────────────
   Cursor-following STROKE GLOW on "RESUME FORGE"
   The glow lives on the text outline/border only.
   A radial mask reveals the glowing stroke only
   near the cursor — so only the letter edges near
   the mouse light up, flowing naturally left→right.
───────────────────────────────────────────── */
function GlowText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  // We animate two gradient centers: the mask gradient and the glow gradient
  const maskGradRef = useRef<SVGRadialGradientElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  
  // Use pixel coords so we can map into SVG space precisely
  const cursorPx = useRef({ x: 0, y: 0 });
  const smoothPx = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const svgW = useRef(1);
  const svgH = useRef(1);

  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current) {
        const r = svgRef.current.getBoundingClientRect();
        svgW.current = r.width || 1;
        svgH.current = r.height || 1;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const animate = () => {
      // Lerp smoothly toward cursor
      smoothPx.current.x += (cursorPx.current.x - smoothPx.current.x) * 0.1;
      smoothPx.current.y += (cursorPx.current.y - smoothPx.current.y) * 0.1;

      if (maskGradRef.current) {
        // Convert to percentage of SVG viewBox
        const pctX = (smoothPx.current.x / svgW.current) * 100;
        const pctY = (smoothPx.current.y / svgH.current) * 100;
        maskGradRef.current.setAttribute('cx', `${pctX}%`);
        maskGradRef.current.setAttribute('cy', `${pctY}%`);
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorPx.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); isHoveredRef.current = true; }}
      onMouseLeave={() => { setIsHovered(false); isHoveredRef.current = false; }}
      style={{
        display: 'block',
        width: '90vw',
        position: 'relative',
        userSelect: 'none',
        cursor: 'crosshair',
        lineHeight: 1,
      }}
    >
      {/*
        Single SVG that fills the full 90vw width.
        viewBox height is set large enough for the text.
        The font-size is expressed in viewBox units.
      */}
      <svg
        ref={svgRef}
        width="100%"
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', overflow: 'visible' }}
        aria-label="RESUME FORGE"
      >
        <defs>
          {/* ── Glow filter: blurs the stroke into a soft halo ── */}
          <filter id="strokeGlow" x="-20%" y="-50%" width="140%" height="200%">
            {/* Strong core glow */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            {/* Wide soft halo */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/*
            ── Radial mask centered on cursor ──
            White = fully revealed, black = hidden.
            The glow stroke is only visible inside this mask.
          */}
          <radialGradient
            id="cursorReveal"
            ref={maskGradRef}
            cx="50%"
            cy="50%"
            r="18%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="45%"  stopColor="white" stopOpacity="0.7" />
            <stop offset="80%"  stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="cursorMask" maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
            <rect x="-50%" y="-200%" width="200%" height="500%" fill="url(#cursorReveal)" />
          </mask>
        </defs>

        {/* ── Layer 1: Base text — solid dark, always visible ── */}
        <text
          x="500"
          y="155"
          textAnchor="middle"
          fontFamily='"Bebas Neue", "Impact", "Arial Black", sans-serif'
          fontSize="160"
          fontWeight="600"
          letterSpacing="24"
          fill="#0d0d0d"
          stroke="none"
        >
          RESUME FORGE
        </text>

        {/*
          ── Layer 2: Glowing stroke — only the border/outline ──
          fill="none" means ONLY the stroke edge glows.
          Masked so only the region near the cursor is revealed.
          Transitions in on hover.
        */}
        <text
          x="500"
          y="155"
          textAnchor="middle"
          fontFamily='"Bebas Neue", "Impact", "Arial Black", sans-serif'
          fontSize="160"
          fontWeight="600"
          letterSpacing="24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.8"
          filter="url(#strokeGlow)"
          mask="url(#cursorMask)"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        >
          RESUME FORGE
        </text>

        {/*
          ── Layer 3: Extra thin bright core stroke on top ──
          Gives a crisp, luminous edge right at the letter border.
        */}
        <text
          x="500"
          y="155"
          textAnchor="middle"
          fontFamily='"Bebas Neue", "Impact", "Arial Black", sans-serif'
          fontSize="160"
          fontWeight="600"
          letterSpacing="24"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="0.3"
          mask="url(#cursorMask)"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        >
          RESUME FORGE
        </text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function ResumeForgeShowcase() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();
  const userName = session?.user?.name || 'RESUME FORGE';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    setMounted(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-white"
    >
      {/* Replaced noisy overlays with a clean transparent base so pure white shows through */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-transparent" />

      {/* ── 3D Scene ── */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 25 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >

          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#fff5e0" />
          <pointLight position={[-8, -5, 5]} intensity={0.4} color="#e8f0ff" />

          <Suspense fallback={null}>
            <Physics gravity={[0, -20, 0]} timeStep="vary">
              <Band isMobile={isMobile} userName={userName} />
            </Physics>

            <Environment preset="city">
              <Lightformer
                intensity={6}
                position={[10, 5, 1]}
                scale={[10, 50, 1]}
                onUpdate={(self) => self.lookAt(0, 0, 0)}
              />
              <Lightformer
                intensity={2}
                position={[-10, -5, 2]}
                scale={[10, 20, 1]}
                onUpdate={(self) => self.lookAt(0, 0, 0)}
              />
            </Environment>
          </Suspense>
        </Canvas>
      </div>

      {/* ── HTML Overlay ── */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          zIndex: 10,
          pointerEvents: 'none',
          justifyContent: 'space-between',
          padding: '0',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '2.5rem',
          }}
        >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(10,10,10,0.06)',
                border: '1px solid rgba(10,10,10,0.12)',
                borderRadius: '999px',
                padding: '0.35rem 1.5rem',
                backdropFilter: 'blur(8px)',
              }}
            >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#1a1a1a',
                display: 'inline-block',
                boxShadow: '0 0 6px rgba(0,0,0,0.5)',
              }}
            />
            <span
              style={{
                fontFamily: '"DM Mono", "Courier New", monospace',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#1a1a1a',
                textTransform: 'uppercase',
              }}
            >
              AI-Powered Career Platform
            </span>
          </div>
        </div>

        {/* Center headline — pointer-events ON so glow works */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'auto',
            marginTop: '-2rem',
            width: '100%',
          }}
        >
          <GlowText />
          <p
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
              color: '#4a4a4a',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginTop: '0.5rem',
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            The Future of Hiring
          </p>
        </div>

        {/* Bottom content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '3rem',
            gap: '1.5rem',
          }}
        >
          <p
            style={{
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
              color: '#6b6b6b',
              maxWidth: '65ch',
              textAlign: 'center',
              lineHeight: 1.7,
              letterSpacing: '0.01em',
            }}
          >
            Experience the next generation of career development. Our state-of-the-art AI 
            analyzes your professional history with mathematical precision, while our 
            award-winning design engine transforms your data into a visual masterpiece. 
            Build a resume that doesn&apos;t just list your experience, but narrates your 
            future with maximum impact and clarity.
          </p>

          {/* CTA row */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              pointerEvents: 'auto',
            }}
          >
            <button
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.75rem 2rem',
                background: '#0a0a0a',
                color: '#f8f7f4',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.18)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              Get Started
            </button>
            <button
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.75rem 2rem',
                background: 'transparent',
                color: '#0a0a0a',
                border: '1px solid rgba(10,10,10,0.3)',
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#0a0a0a';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(10,10,10,0.3)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              See Examples
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              opacity: 0.35,
            }}
          >
            <div
              style={{
                width: 1,
                height: 32,
                background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
                animation: 'scrollPulse 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: '#0a0a0a',
                textTransform: 'uppercase',
              }}
            >
              Scroll
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;600&family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap');
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Physics Band (ID card lanyard)
───────────────────────────────────────────── */
function Band({ isMobile, userName }: { isMobile: boolean; userName: string }) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    // Safety check for all refs
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current || !band.current) return;

    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      
      const targetPos = {
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      };

      if (!isNaN(targetPos.x) && !isNaN(targetPos.y) && !isNaN(targetPos.z)) {
        card.current?.setNextKinematicTranslation(targetPos);
      }
    }

    // Helper to validate translation
    const getValidTranslation = (ref: any) => {
      const t = ref.current?.translation();
      if (!t || isNaN(t.x) || isNaN(t.y) || isNaN(t.z)) return null;
      return t;
    };

    const tFixed = getValidTranslation(fixed);
    const tJ1 = getValidTranslation(j1);
    const tJ2 = getValidTranslation(j2);
    const tJ3 = getValidTranslation(j3);
    const tCard = getValidTranslation(card);

    if (tFixed && tJ1 && tJ2 && tJ3 && tCard) {
      [j1, j2].forEach((ref) => {
        const t = ref.current.translation();
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(t);
        }
        
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(t))
        );
        ref.current.lerped.lerp(t, delta * (clampedDistance * 50));
      });

      curve.points[0].copy(tJ3);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(tFixed);
      
      const points = curve.getPoints(isMobile ? 16 : 32);
      // Final points validation
      if (points.every(p => !isNaN(p.x) && !isNaN(p.y) && !isNaN(p.z))) {
        band.current.geometry.setPoints(points);
      }

      const angVel = card.current.angvel();
      const rotation = card.current.rotation();
      if (!isNaN(angVel.x) && !isNaN(rotation.y)) {
        ang.copy(angVel);
        rot.copy(rotation);
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      }
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[-0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[-1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[-1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[-2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.05]} />
          <group
            scale={1}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              if (!card.current) return;
              const t = card.current.translation();
              if (isNaN(t.x) || isNaN(t.y) || isNaN(t.z) || isNaN(e.point.x)) return;

              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(t))
              );
            }}
          >
            {/* Card body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.6, 2.25, 0.03]} />
              <meshStandardMaterial
                color="#0a0a0a"
                metalness={0.7}
                roughness={0.08}
              />
            </mesh>

            {/* Card face plate (slight inset, lighter) */}
            <mesh position={[0, 0, 0.042]}>
              <boxGeometry args={[1.45, 2.1, 0.005]} />
              <meshStandardMaterial
                color="#141414"
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>

            {/* Horizontal rule */}
            <mesh position={[0, 0.3, 0.048]}>
              <boxGeometry args={[1.1, 0.005, 0.005]} />
              <meshStandardMaterial color="#444" />
            </mesh>

            {/* Logo mark */}
            <Text
              position={[0, 0.65, 0.06]}
              fontSize={0.18}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font={undefined}
              letterSpacing={0.08}
            >
              {initials}
            </Text>

            <Text
              position={[0, 0.15, 0.06]}
              fontSize={userName.length > 15 ? 0.08 : 0.11}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
              maxWidth={1.2}
            >
              {userName.toUpperCase()}
            </Text>

            <Text
              position={[0, -0.1, 0.06]}
              fontSize={0.065}
              color="#888888"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.04}
            >
              FREE
            </Text>

            {/* Barcode-style decoration */}
            {[...Array(12)].map((_, i) => (
              <mesh key={i} position={[-0.44 + i * 0.08, -0.7, 0.048]}>
                <boxGeometry args={[i % 3 === 0 ? 0.025 : 0.012, 0.22, 0.004]} />
                <meshStandardMaterial color={i % 3 === 0 ? '#555' : '#333'} />
              </mesh>
            ))}

            {/* NFC ring */}
            <mesh position={[0, -1.0, 0.048]} rotation={[0, 0, 0]}>
              <ringGeometry args={[0.12, 0.155, 32]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>

            {/* Lanyard clip */}
            <mesh position={[0, 1.15, 0]}>
              <boxGeometry args={[0.28, 0.12, 0.16]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Lanyard rope */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="#1a1a1a"
          depthTest={true}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={0.08}
        />
      </mesh>
    </>
  );
}