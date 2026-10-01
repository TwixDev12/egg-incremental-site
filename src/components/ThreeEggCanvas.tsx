import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Rotate3d, Volume2, VolumeX, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export type EggSkin = 'golden' | 'cosmic' | 'diamond' | 'inferno';

interface SkinConfig {
  name: string;
  badge: string;
  color: number;
  emissive: number;
  roughness: number;
  metalness: number;
  ringColor: number;
  particleColor: number;
  gemColor: number;
  ambientLight: number;
  spotColor: number;
}

const SKINS: Record<EggSkin, SkinConfig> = {
  golden: {
    name: 'Founder Golden Egg',
    badge: '★ FOUNDER EDITION',
    color: 0xffb703,
    emissive: 0x3d2500,
    roughness: 0.18,
    metalness: 0.85,
    ringColor: 0xffd166,
    particleColor: 0xffe299,
    gemColor: 0x06d6a0,
    ambientLight: 0x5a3e10,
    spotColor: 0xfff3b0,
  },
  cosmic: {
    name: 'Cosmic Nebula Egg',
    badge: '✦ CELESTIAL MYTHIC',
    color: 0x9d4edd,
    emissive: 0x240046,
    roughness: 0.12,
    metalness: 0.4,
    ringColor: 0xf72585,
    particleColor: 0x7209b7,
    gemColor: 0x4cc9f0,
    ambientLight: 0x240046,
    spotColor: 0xe0aaff,
  },
  diamond: {
    name: 'Prestige Diamond Egg',
    badge: '💎 PRESTIGE TIER',
    color: 0x00f5d4,
    emissive: 0x003554,
    roughness: 0.08,
    metalness: 0.3,
    ringColor: 0x70e000,
    particleColor: 0x9ef01a,
    gemColor: 0x38b000,
    ambientLight: 0x002855,
    spotColor: 0xb9fbc0,
  },
  inferno: {
    name: 'Volcanic Inferno Egg',
    badge: '🔥 SECRET DROP',
    color: 0xd90429,
    emissive: 0x370617,
    roughness: 0.22,
    metalness: 0.6,
    ringColor: 0xf48c06,
    particleColor: 0xffba08,
    gemColor: 0xffd000,
    ambientLight: 0x3f050b,
    spotColor: 0xff9e00,
  },
};

interface ThreeEggCanvasProps {
  onScoreGained?: (coins: number) => void;
}

export const ThreeEggCanvas: React.FC<ThreeEggCanvasProps> = ({ onScoreGained }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkin, setActiveSkin] = useState<EggSkin>('golden');
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [clicks, setClicks] = useState(0);
  const [cracksLevel, setCracksLevel] = useState(0); // 0 to 3
  const [hatchState, setHatchState] = useState<string | null>(null);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const eggMeshRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const orbitingGroupRef = useRef<THREE.Group | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Animation & Physics state
  const wobbleVelocity = useRef(0);
  const wobbleRotation = useRef(0);
  const scaleY = useRef(1);
  const scaleXZ = useRef(1);
  const targetRotationY = useRef(0);
  const isDragging = useRef(false);
  const previousMouseX = useRef(0);
  const mouseHoverTilt = useRef({ x: 0, y: 0 });

  // Handle skin changes
  const applySkin = useCallback((skinKey: EggSkin) => {
    const skin = SKINS[skinKey];
    if (eggMeshRef.current) {
      const mat = eggMeshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.color.setHex(skin.color);
      mat.emissive.setHex(skin.emissive);
      mat.roughness = skin.roughness;
      mat.metalness = skin.metalness;
      mat.needsUpdate = true;
    }
    if (ringRef.current) {
      (ringRef.current.material as THREE.MeshBasicMaterial).color.setHex(skin.ringColor);
    }
    if (ring2Ref.current) {
      (ring2Ref.current.material as THREE.MeshBasicMaterial).color.setHex(skin.ringColor);
    }
    if (spotLightRef.current) {
      spotLightRef.current.color.setHex(skin.spotColor);
    }
    if (ambientLightRef.current) {
      ambientLightRef.current.color.setHex(skin.ambientLight);
    }
    if (particlesRef.current) {
      (particlesRef.current.material as THREE.PointsMaterial).color.setHex(skin.particleColor);
    }
  }, []);

  useEffect(() => {
    applySkin(activeSkin);
  }, [activeSkin, applySkin]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Mathematically True 3D Egg Geometry via Spline Lathe
    const eggPoints: THREE.Vector2[] = [];
    const numPoints = 36;
    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * Math.PI; // from 0 (top) to PI (bottom)
      // Egg formula cross-section: r(theta) = sin(theta) * (1 - 0.2 * cos(theta))
      const radius = Math.sin(theta) * (0.85 - 0.18 * Math.cos(theta));
      const y = Math.cos(theta) * 1.25; // height profile
      eggPoints.push(new THREE.Vector2(radius, y));
    }
    const eggGeometry = new THREE.LatheGeometry(eggPoints, 48);
    eggGeometry.computeVertexNormals();

    const skin = SKINS[activeSkin];
    const eggMaterial = new THREE.MeshPhysicalMaterial({
      color: skin.color,
      emissive: skin.emissive,
      roughness: skin.roughness,
      metalness: skin.metalness,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const eggMesh = new THREE.Mesh(eggGeometry, eggMaterial);
    scene.add(eggMesh);
    eggMeshRef.current = eggMesh;

    // 3. 3D Orbital Rings (Torus)
    const ringGeo = new THREE.TorusGeometry(1.22, 0.024, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: skin.ringColor, transparent: true, opacity: 0.85 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    ring.rotation.y = Math.PI / 8;
    scene.add(ring);
    ringRef.current = ring;

    const ring2Geo = new THREE.TorusGeometry(1.36, 0.015, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: skin.ringColor, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 2.6;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);
    ring2Ref.current = ring2;

    // 4. Orbiting Items Group (Floating 3D Coins & Gems)
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    orbitingGroupRef.current = orbitGroup;

    // Coin 1
    const coinGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24);
    const coinMat = new THREE.MeshStandardMaterial({ color: 0xffbe0b, metalness: 0.9, roughness: 0.2 });
    const coin1 = new THREE.Mesh(coinGeo, coinMat);
    coin1.position.set(1.5, 0.3, 0);
    coin1.rotation.x = Math.PI / 4;
    orbitGroup.add(coin1);

    // Coin 2
    const coin2 = new THREE.Mesh(coinGeo, coinMat);
    coin2.position.set(-1.45, -0.4, 0.3);
    coin2.rotation.z = Math.PI / 3;
    orbitGroup.add(coin2);

    // Emerald Gem (Octahedron)
    const gemGeo = new THREE.OctahedronGeometry(0.18);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x06d6a0,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 0.5,
    });
    const gem1 = new THREE.Mesh(gemGeo, gemMat);
    gem1.position.set(0.4, 1.35, 0.5);
    orbitGroup.add(gem1);

    // Gem 2 (Ruby)
    const rubyMat = new THREE.MeshPhysicalMaterial({
      color: 0xef476f,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.75,
    });
    const gem2 = new THREE.Mesh(gemGeo, rubyMat);
    gem2.position.set(-0.6, -1.25, -0.4);
    orbitGroup.add(gem2);

    // 5. 3D Particle Cloud
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.3 + Math.random() * 1.5;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: skin.particleColor,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(skin.ambientLight, 2.5);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(3, 4, 4);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const spotLight = new THREE.SpotLight(skin.spotColor, 3.5, 8, Math.PI / 4, 0.4);
    spotLight.position.set(0, 3.5, 2.5);
    scene.add(spotLight);
    spotLightRef.current = spotLight;

    // 7. Mouse & Touch Interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseHoverTilt.current = { x: x * 0.25, y: y * 0.2 };

      if (isDragging.current) {
        const deltaX = e.clientX - previousMouseX.current;
        targetRotationY.current += deltaX * 0.012;
        previousMouseX.current = e.clientX;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && isDragging.current) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - previousMouseX.current;
        targetRotationY.current += deltaX * 0.015;
        previousMouseX.current = touch.clientX;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging.current = true;
        previousMouseX.current = e.touches[0].clientX;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // 8. Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Wobble physics spring relaxation
      wobbleVelocity.current += (0 - wobbleRotation.current) * 0.18; // spring pull
      wobbleVelocity.current *= 0.82; // damping friction
      wobbleRotation.current += wobbleVelocity.current;

      // Scale bounce relaxation
      scaleY.current += (1 - scaleY.current) * 0.2;
      scaleXZ.current += (1 - scaleXZ.current) * 0.2;

      // Idle hovering + smooth rotation
      if (!isDragging.current) {
        targetRotationY.current += 0.008; // slow auto spin
      }

      if (eggMeshRef.current) {
        eggMeshRef.current.rotation.y = targetRotationY.current;
        eggMeshRef.current.rotation.z = wobbleRotation.current + mouseHoverTilt.current.x * 0.5;
        eggMeshRef.current.rotation.x = mouseHoverTilt.current.y * 0.5;
        eggMeshRef.current.position.y = Math.sin(elapsed * 2) * 0.07;
        eggMeshRef.current.scale.set(scaleXZ.current, scaleY.current, scaleXZ.current);
      }

      if (ringRef.current) {
        ringRef.current.rotation.z = elapsed * 0.6;
        ringRef.current.position.y = Math.sin(elapsed * 2) * 0.07;
      }

      if (ring2Ref.current) {
        ring2Ref.current.rotation.z = -elapsed * 0.45;
        ring2Ref.current.position.y = Math.sin(elapsed * 2) * 0.07;
      }

      if (orbitingGroupRef.current) {
        orbitingGroupRef.current.rotation.y = elapsed * 0.5;
        orbitingGroupRef.current.position.y = Math.sin(elapsed * 2) * 0.07;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = -elapsed * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeSkin]);

  // Click physics & incremental gameplay trigger
  const handleEggClick = () => {
    // 1. Physical bounce
    wobbleVelocity.current = (Math.random() - 0.5) * 0.4;
    scaleY.current = 0.82; // squish downward
    scaleXZ.current = 1.18; // expand outward

    // 2. Audio feedback
    sounds.playEggPop(1.0 + Math.random() * 0.3);
    sounds.playCoinChime();

    // 3. Gameplay reward
    const coinsGained = 25;
    if (onScoreGained) onScoreGained(coinsGained);

    const nextClicks = clicks + 1;
    setClicks(nextClicks);

    // Progress crack stages
    if (nextClicks % 10 === 0) {
      const nextCrack = Math.min(3, cracksLevel + 1);
      setCracksLevel(nextCrack);

      if (nextCrack === 3) {
        // Grand Hatch!
        triggerGrandHatch();
      } else {
        sounds.playUpgradeSound();
      }
    }
  };

  const triggerGrandHatch = () => {
    sounds.playHatchFanfare();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#ffd166', '#06d6a0', '#118ab2', '#ef476f', '#9d4edd'],
    });

    const pets = [
      '👑 Mythic Golden Dragon (+10x Boost)',
      '🌌 Cosmic Phoenix (+15x Boost)',
      '💎 Diamond Astral Golem (+20x Boost)',
      '🔥 Solar Leviathan (+25x Boost)',
    ];
    const rewarded = pets[Math.floor(Math.random() * pets.length)];
    setHatchState(rewarded);

    setTimeout(() => {
      setCracksLevel(0);
    }, 4000);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Interactive Canvas Viewport */}
      <div
        ref={containerRef}
        onClick={handleEggClick}
        className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] cursor-grab active:cursor-grabbing select-none rounded-[2rem] overflow-hidden"
        title="Click to tap & harvest! Drag to spin in 3D!"
      >
        {/* Floating Controls Overlay (Double-Bezel Island) */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          {/* Active Skin Badge */}
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs font-black text-white shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{SKINS[activeSkin].badge}</span>
          </div>

          {/* Sound & Spin hint */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-black/60 border border-white/15 hover:bg-white/10 text-white backdrop-blur-md transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-semibold text-slate-300">
              <Rotate3d className="w-3.5 h-3.5 text-amber-400" />
              <span>Drag to Spin 360°</span>
            </div>
          </div>
        </div>

        {/* Crack Progress Bar at Bottom of Canvas */}
        <div className="absolute bottom-4 left-6 right-6 pointer-events-none z-10 flex flex-col items-center">
          {hatchState ? (
            <div className="px-5 py-2 rounded-2xl bg-amber-500/90 border border-amber-300 text-slate-950 font-black text-sm tracking-wide shadow-2xl animate-bounce pointer-events-auto">
              {hatchState}
            </div>
          ) : (
            <div className="w-full max-w-md p-2 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 pl-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Crack Phase: {cracksLevel}/3</span>
              </div>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 rounded-full"
                  style={{ width: `${((clicks % 10) / 10) * 100}%` }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400 pr-2">
                {clicks % 10}/10
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3D Skin Selector Tabs (Apple-Style Segmented Control) */}
      <div className="mt-4 p-1.5 rounded-full bg-[#120e29] border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-center gap-1 max-w-xl">
        {(Object.keys(SKINS) as EggSkin[]).map((key) => {
          const skin = SKINS[key];
          const isSelected = activeSkin === key;
          return (
            <button
              key={key}
              onClick={() => setActiveSkin(key)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30 scale-102 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: `#${skin.color.toString(16).padStart(6, '0')}` }}
              />
              <span>{skin.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
