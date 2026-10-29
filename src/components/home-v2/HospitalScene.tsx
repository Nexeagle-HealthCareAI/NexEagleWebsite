"use client";

// Signature 3D hero scene: a small hospital campus where each building is one NexEagle product,
// joined by paths that carry glowing "data pulses", plus the patient's home and the road Vita
// guides them along: the whole journey, from first symptom to final report, in one picture.
// Built from primitives only (no model files, no remote HDRs) so it loads fast and works offline.

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { RoundedBox, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

export type ProductKey = "1hms" | "1rad" | "1lab" | "1pharma";
export type Stage = "find" | "book" | "go" | "hms" | "rad";

const C = {
  porcelain: "#ffffff",
  wall: "#e9f0f1",
  plinth: "#dfeaeb",
  glass: "#1ea99b",
  glassDeep: "#12857a",
  sky: "#1599db",
  iris: "#8a6fe0",
  ink: "#0e2343",
  path: "#c6d9dc",
  green: "#22a559",
};

type BuildingDef = {
  key: ProductKey;
  label: string;
  caption: string;
  pos: [number, number, number];
  size: [number, number, number];
  door: [number, number, number]; // where the path meets the building
};

const BUILDINGS: BuildingDef[] = [
  { key: "1hms", label: "1HMS", caption: "OPD, wards & billing", pos: [0, 0, -0.6], size: [2.4, 2.1, 1.6], door: [0, 0.06, 0.3] },
  { key: "1rad", label: "1Rad", caption: "PACS & AI reporting", pos: [-2.55, 0, 0.55], size: [1.6, 1.0, 1.5], door: [-1.7, 0.06, 0.75] },
  { key: "1lab", label: "1Lab", caption: "Samples to results", pos: [2.55, 0, 0.55], size: [1.6, 1.15, 1.5], door: [1.7, 0.06, 0.75] },
  { key: "1pharma", label: "1Pharma", caption: "Stock & dispensing", pos: [0, 0, 2.35], size: [1.7, 0.85, 1.1], door: [0, 0.06, 1.75] },
];

const HUB: [number, number, number] = [0, 0.06, 0.95];

/* ── Window strips: thin glass panes set into a facade ─────────────────────────────── */
function Windows({ w, h, d, rows, cols, lit }: { w: number; h: number; d: number; rows: number; cols: number; lit: boolean }) {
  const panes = [];
  const gapX = w / cols;
  const gapY = (h - 0.35) / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      panes.push(
        <mesh key={`${r}-${c}`} position={[-w / 2 + gapX * (c + 0.5), 0.3 + gapY * (r + 0.5), d / 2 + 0.006]}>
          <planeGeometry args={[gapX * 0.62, gapY * 0.5]} />
          <meshStandardMaterial
            color={lit ? C.glass : "#bfd6d9"}
            emissive={lit ? C.glass : "#000000"}
            emissiveIntensity={lit ? 0.35 : 0}
            roughness={0.25}
            metalness={0.1}
          />
        </mesh>
      );
    }
  }
  return <group>{panes}</group>;
}

/* ── One product building; lifts and lights when active ────────────────────────────── */
function Building({ def, active, onSelect, children }: { def: BuildingDef; active: boolean; onSelect: (k: ProductKey) => void; children?: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const [w, h, d] = def.size;
  useFrame((_, dt) => {
    if (!ref.current) return;
    const target = active ? 0.18 : 0;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, target, 6, dt);
  });
  const over = (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); onSelect(def.key); document.body.style.cursor = "pointer"; };
  const out = () => { document.body.style.cursor = ""; };
  return (
    <group position={def.pos}>
      <group ref={ref} onPointerOver={over} onPointerOut={out} onClick={(e) => { e.stopPropagation(); onSelect(def.key); }}>
        <RoundedBox args={[w, h, d]} radius={0.08} smoothness={3} position={[0, h / 2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={C.porcelain} roughness={0.85} />
        </RoundedBox>
        {/* roof trim */}
        <RoundedBox args={[w + 0.06, 0.08, d + 0.06]} radius={0.03} smoothness={2} position={[0, h + 0.02, 0]} castShadow>
          <meshStandardMaterial color={C.wall} roughness={0.7} />
        </RoundedBox>
        {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((ry, i) => {
          const face = i % 2 === 0 ? w : d;
          const depth = i % 2 === 0 ? d : w;
          return (
            <group key={i} rotation={[0, ry, 0]}>
              <Windows w={face} h={h} d={depth} rows={Math.max(1, Math.round(h / 0.45))} cols={Math.max(2, Math.round(face / 0.42))} lit={active} />
            </group>
          );
        })}
        {children}
        <Html position={[0, h + 0.55, 0]} center distanceFactor={10} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <div className={`ne-scene-label ${active ? "is-active" : ""}`}>
            <strong>{def.label}</strong>
            <span>{def.caption}</span>
          </div>
        </Html>
      </group>
    </group>
  );
}

/* ── Product-specific rooftop details ──────────────────────────────────────────────── */
function HelipadAndCross() {
  return (
    <group position={[0, 2.16, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.55, 0.005, 0]}>
        <circleGeometry args={[0.42, 40]} />
        <meshStandardMaterial color="#dfe8ea" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.55, 0.01, 0]}>
        <ringGeometry args={[0.34, 0.37, 40]} />
        <meshStandardMaterial color={C.glass} />
      </mesh>
      {/* teal cross sign */}
      <group position={[-0.6, 0.32, 0]}>
        <RoundedBox args={[0.5, 0.15, 0.1]} radius={0.03}><meshStandardMaterial color={C.glass} emissive={C.glass} emissiveIntensity={0.25} /></RoundedBox>
        <RoundedBox args={[0.15, 0.5, 0.1]} radius={0.03}><meshStandardMaterial color={C.glass} emissive={C.glass} emissiveIntensity={0.25} /></RoundedBox>
      </group>
    </group>
  );
}

function ScannerRing({ spin }: { spin: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current && spin) ref.current.rotation.z += dt * 0.6; });
  return (
    <group position={[0, 1.42, 0]}>
      <mesh ref={ref} castShadow>
        <torusGeometry args={[0.36, 0.11, 20, 48]} />
        <meshStandardMaterial color={C.porcelain} roughness={0.4} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.36, 0.035, 12, 48]} />
        <meshStandardMaterial color={C.sky} emissive={C.sky} emissiveIntensity={0.6} />
      </mesh>
      <RoundedBox args={[0.9, 0.12, 0.35]} radius={0.04} position={[0, -0.36, 0]}>
        <meshStandardMaterial color={C.wall} />
      </RoundedBox>
    </group>
  );
}

function TestTubes() {
  const tubes = [-0.45, -0.15, 0.15, 0.45];
  const colors = [C.glass, C.sky, C.iris, C.glass];
  return (
    <group position={[0, 1.2, 0]}>
      {tubes.map((x, i) => (
        <group key={i} position={[x, 0.2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.42, 16]} />
            <meshPhysicalMaterial color="#ffffff" transmission={0.6} roughness={0.15} thickness={0.2} transparent opacity={0.7} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.22 + i * 0.03, 16]} />
            <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PharmacyCross() {
  return (
    <group position={[0, 1.2, 0.15]}>
      <RoundedBox args={[0.46, 0.15, 0.1]} radius={0.03}><meshStandardMaterial color={C.green} emissive={C.green} emissiveIntensity={0.35} /></RoundedBox>
      <RoundedBox args={[0.15, 0.46, 0.1]} radius={0.03}><meshStandardMaterial color={C.green} emissive={C.green} emissiveIntensity={0.35} /></RoundedBox>
    </group>
  );
}

/* ── Paths + travelling data pulses ────────────────────────────────────────────────── */
function DataPath({ from, color, active, speed = 0.22, offset = 0 }: { from: [number, number, number]; color: string; active: boolean; speed?: number; offset?: number }) {
  const curve = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...HUB);
    const mid = a.clone().lerp(b, 0.5);
    mid.y += 0.02;
    return new THREE.CatmullRomCurve3([a, mid, b]);
  }, [from]);
  const pulses = useRef<THREE.Mesh[]>([]);
  const t = useRef(offset);
  useFrame((_, dt) => {
    t.current = (t.current + dt * speed * (active ? 1.8 : 1)) % 1;
    pulses.current.forEach((m, i) => {
      if (!m) return;
      // two pulses per path, one in each direction: requests out, results back
      const u = i === 0 ? t.current : 1 - ((t.current + 0.5) % 1);
      m.position.copy(curve.getPointAt(u));
      m.position.y += 0.05;
    });
  });
  return (
    <group>
      <mesh receiveShadow>
        <tubeGeometry args={[curve, 32, 0.075, 10, false]} />
        <meshStandardMaterial color={active ? color : C.path} emissive={active ? color : "#000"} emissiveIntensity={active ? 0.35 : 0} roughness={0.6} />
      </mesh>
      {[0, 1].map((i) => (
        <mesh key={i} ref={(el) => { if (el) pulses.current[i] = el; }}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Hub() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.08;
    ring.current.scale.set(s, s, s);
  });
  return (
    <group position={HUB}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.32, 40]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.24, 0.3, 40]} />
        <meshStandardMaterial color={C.glass} emissive={C.glass} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function Trees() {
  const spots: [number, number][] = [[-3.6, -1.1], [-3.3, 1.9], [3.6, -1.1], [3.75, 1.7], [-1.6, 2.6], [2.2, 3.2], [-1.7, -1.6], [1.75, -1.6]];
  return (
    <group>
      {spots.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.12, 0]} castShadow><cylinderGeometry args={[0.03, 0.04, 0.24, 8]} /><meshStandardMaterial color="#c9b9a6" /></mesh>
          <mesh position={[0, 0.36, 0]} castShadow><sphereGeometry args={[0.2 + (i % 3) * 0.03, 16, 16]} /><meshStandardMaterial color={i % 2 ? "#9fd3c4" : "#b7e0d3"} roughness={0.9} /></mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Patient's home, the road to the hospital, and the patient travelling along it ──── */
const HOME: [number, number, number] = [3.55, 0, 3.05];
const ROAD = new THREE.CatmullRomCurve3([
  new THREE.Vector3(3.15, 0.05, 2.75),
  new THREE.Vector3(2.55, 0.05, 2.35),
  new THREE.Vector3(1.5, 0.05, 2.0),
  new THREE.Vector3(0.95, 0.05, 1.45),
  new THREE.Vector3(HUB[0] + 0.3, 0.05, HUB[2] + 0.1),
]);

function Home({ lit, onPick }: { lit: boolean; onPick: () => void }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const s = lit ? 1 + ((clock.elapsedTime * 0.8) % 1) * 0.9 : 1;
    ring.current.scale.set(s, s, s);
    (ring.current.material as THREE.MeshStandardMaterial).opacity = lit ? 0.7 - ((clock.elapsedTime * 0.8) % 1) * 0.7 : 0;
  });
  return (
    <group position={HOME} onClick={(e) => { e.stopPropagation(); onPick(); }}>
      <RoundedBox args={[0.7, 0.45, 0.6]} radius={0.04} position={[0, 0.225, 0]} castShadow>
        <meshStandardMaterial color="#fff7ec" roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, 0.6, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.55, 0.32, 4]} />
        <meshStandardMaterial color="#e8b48a" roughness={0.8} />
      </mesh>
      <mesh position={[0.18, 0.2, 0.301]}>
        <planeGeometry args={[0.16, 0.16]} />
        <meshStandardMaterial color={lit ? "#ffd27a" : "#c9d8db"} emissive={lit ? "#ffb84d" : "#000"} emissiveIntensity={lit ? 0.6 : 0} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.5, 0.56, 40]} />
        <meshStandardMaterial color={C.iris} emissive={C.iris} emissiveIntensity={0.8} transparent opacity={0} />
      </mesh>
      <Html position={[0, 1.05, 0]} center distanceFactor={10} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div className={`ne-scene-label ${lit ? "is-active" : ""}`}>
          <strong>Patient</strong>
          <span>Talking to Vita</span>
        </div>
      </Html>
    </group>
  );
}

function Road({ stage, animate }: { stage: Stage; animate: boolean }) {
  const marker = useRef<THREE.Group>(null);
  const trail = useRef<THREE.Mesh[]>([]);
  const t = useRef(0);
  useFrame((_, dt) => {
    const target = stage === "find" || stage === "book" ? 0 : 1;
    if (stage === "go" && animate) t.current = Math.min(1, t.current + dt / 3.2);
    else t.current = THREE.MathUtils.damp(t.current, target, 5, dt);
    const u = THREE.MathUtils.clamp(t.current, 0, 1);
    if (marker.current) {
      marker.current.position.copy(ROAD.getPointAt(u));
      marker.current.position.y += 0.05;
      marker.current.visible = stage !== "rad";
    }
    trail.current.forEach((m, i) => {
      if (!m) return;
      const k = ((i / 6 + (animate ? performance.now() / 2400 : 0)) % 1);
      m.position.copy(ROAD.getPointAt(k));
      m.position.y += 0.03;
      m.visible = stage === "go";
    });
  });
  return (
    <group>
      <mesh receiveShadow>
        <tubeGeometry args={[ROAD, 48, 0.12, 8, false]} />
        <meshStandardMaterial color={stage === "go" ? "#d9d2f5" : "#dde7e8"} roughness={0.9} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) trail.current[i] = el; }}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial color={C.iris} emissive={C.iris} emissiveIntensity={1} toneMapped={false} />
        </mesh>
      ))}
      <group ref={marker}>
        <mesh position={[0, 0.32, 0]} castShadow>
          <sphereGeometry args={[0.15, 20, 20]} />
          <meshStandardMaterial color={C.iris} emissive={C.iris} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <coneGeometry args={[0.1, 0.22, 20]} />
          <meshStandardMaterial color={C.iris} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[0.16, 0.22, 32]} />
          <meshStandardMaterial color={C.iris} emissive={C.iris} emissiveIntensity={0.6} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Whole campus with gentle pointer parallax ─────────────────────────────────────── */
function Campus({ stage, onPick, animate }: { stage: Stage; onPick: (s: Stage) => void; animate: boolean }) {
  const isActive = (k: ProductKey) => (stage === "hms" ? k !== "1rad" : stage === "rad" ? k === "1rad" : false);
  const onSelect = (k: ProductKey) => onPick(k === "1rad" ? "rad" : "hms");
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }, dt) => {
    if (!ref.current) return;
    const idle = animate ? Math.sin(clock.elapsedTime * 0.25) * 0.08 : 0;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, -0.62 + idle + (animate ? pointer.x * 0.18 : 0), 3, dt);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, animate ? -pointer.y * 0.05 : 0, 3, dt);
  });
  const colorFor: Record<ProductKey, string> = { "1hms": C.glass, "1rad": C.sky, "1lab": C.iris, "1pharma": C.green };
  return (
    <group ref={ref} position={[0, -0.9, 0]}>
      <RoundedBox args={[8.8, 0.3, 6.8]} radius={0.22} smoothness={4} position={[0, -0.15, 0.4]} receiveShadow>
        <meshStandardMaterial color={C.plinth} roughness={0.95} />
      </RoundedBox>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0.4]} receiveShadow>
        <planeGeometry args={[8.4, 6.4]} />
        <meshStandardMaterial color="#f3f8f8" roughness={1} />
      </mesh>
      <Trees />
      <Hub />
      <Home lit={stage === "find" || stage === "book"} onPick={() => onPick("find")} />
      <Road stage={stage} animate={animate} />
      {BUILDINGS.map((b, i) => (
        <group key={b.key}>
          <DataPath from={b.door} color={colorFor[b.key]} active={isActive(b.key)} offset={i * 0.27} speed={0.18 + i * 0.03} />
          <Building def={b} active={isActive(b.key)} onSelect={onSelect}>
            {b.key === "1hms" && <HelipadAndCross />}
            {b.key === "1rad" && <ScannerRing spin={animate} />}
            {b.key === "1lab" && <TestTubes />}
            {b.key === "1pharma" && <PharmacyCross />}
          </Building>
        </group>
      ))}
    </group>
  );
}

/* Keep the whole campus in frame at any container shape: hold the horizontal field of view
   roughly constant, so narrow/tall containers zoom out instead of clipping the sides. */
function FitCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(1, size.height);
    const hfov = THREE.MathUtils.degToRad(size.width < 640 ? 35 : 31);
    const vfov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(hfov / 2) / aspect));
    cam.fov = THREE.MathUtils.clamp(vfov, 20, 38);
    // Wide stage (desktop): campus sits left of the agent panel. Narrow: centred.
    if (size.width >= 900) cam.lookAt(1.0, -1.25, -0.3);
    else cam.lookAt(-0.25, -1.0, 0.75);
    cam.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

export default function HospitalScene({ stage, onPick }: { stage: Stage; onPick: (s: Stage) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    try { setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch { /* ignore */ }
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        frameloop={visible && !reduced ? "always" : "demand"}
        camera={{ position: [11.5, 10.2, 13.2], fov: 27, near: 0.1, far: 100 }}
        flat
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <FitCamera />
        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#ffffff", "#cfe4e1", 0.85]} />
        <directionalLight
          position={[5, 9, 4]}
          intensity={2.3}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={7}
          shadow-camera-bottom={-7}
          shadow-bias={-0.0004}
        />
        <Campus stage={stage} onPick={onPick} animate={!reduced} />
        <ContactShadows position={[0, -1.06, 0.4]} opacity={0.35} scale={14} blur={2.6} far={3} frames={1} />
      </Canvas>
    </div>
  );
}
