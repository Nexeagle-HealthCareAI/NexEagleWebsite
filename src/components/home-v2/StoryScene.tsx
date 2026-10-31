"use client";

// The homepage story in three screens, laid out along one long 3D stage that the camera
// travels through:
//   1. Home: the patient tells Vita what's wrong; Vita finds and books the right doctor.
//   2. Hospital: the patient arrives at the campus, then inside the consulting room the
//      doctor's 1HMS Vita checks in, records vitals, drafts the prescription and routes orders.
//   3. Radiology: the scan is taken, 1Rad Vita drafts the report, the radiologist signs it and
//      it flies straight back into 1HMS.
// Every set is built from primitives; people are the same low-poly figures as on the campus.

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, PerformanceMonitor, RoundedBox, SoftShadows, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer, SMAA } from "@react-three/postprocessing";
import { Check, FileText, MapPin, Star } from "lucide-react";
import { CAMPUS_Y, Campus } from "./HospitalScene";
import People, { Person } from "./People";

export type Screen = "find" | "hms" | "rad";
export const SCREENS: { key: Screen; step: string; agent: string; ms: number }[] = [
  { key: "find", step: "Patient meets Vita", agent: "Vita for patients", ms: 11000 },
  { key: "hms", step: "Inside the hospital", agent: "1HMS Vita", ms: 12500 },
  { key: "rad", step: "Radiology report", agent: "1Rad Vita", ms: 12000 },
];

// Where each set sits on the stage (world x), and the campus in the middle.
const X = { home: -15, campus: 0, room: 12.5, rad: 25 };
const ink = "#0e2343";
// Frame-time cap: keeps motion smooth when a device stalls. '#fast' in the URL lifts it (for testing).
const DT_CAP = typeof window !== "undefined" && window.location.hash.includes("fast") ? 10 : 0.1;
const glow = (hex: string, k = 3.2) => new THREE.Color(hex).multiplyScalar(k);

/* ── Clock: seconds since the current screen began, shared by every set ─────────────── */
type ClockRef = React.MutableRefObject<{ screen: Screen; t: number }>;

/* ── Vita as an actor: flies, lands, and changes pose while she works ─────────────────── */
const IMG_W = 1200, IMG_H = 851;
const FARP = { x: 0.453, y: 0.53 }, NEARP = { x: 0.652, y: 0.626 };
function layerGeometry(px: number, py: number, scale: number) {
  const g = new THREE.PlaneGeometry(IMG_W * scale, IMG_H * scale);
  g.translate(-(px - 0.5) * IMG_W * scale, (py - 0.5) * IMG_H * scale, 0);
  return g;
}

export type Pose = "fly" | "present" | "think" | "happy";
const POSES: Record<Exclude<Pose, "fly">, { src: string; w: number; h: number }> = {
  present: { src: "/assets/vita/vita-present.webp", w: 753, h: 760 },
  think: { src: "/assets/vita/vita-think.webp", w: 466, h: 640 },
  happy: { src: "/assets/vita/vita-happy.webp", w: 1006, h: 760 },
};
export type Act = { at: THREE.Vector3; pose: Pose };
type ActRef = React.MutableRefObject<Act>;

function Vita({ act, width = 1.3, animate, face = -1, height = 0.78 }: { act: ActRef; width?: number; animate: boolean; face?: 1 | -1; height?: number }) {
  const scale = width / IMG_W;
  const [far, body, near, present, think, happy] = useTexture([
    "/assets/vita/fly-wing-far.webp", "/assets/vita/fly-body.webp", "/assets/vita/fly-wing-near.webp",
    POSES.present.src, POSES.think.src, POSES.happy.src,
  ]);
  [far, body, near, present, think, happy].forEach((t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; });
  const poseTex = { present, think, happy };
  const rig = useRef<THREE.Group>(null);
  const flyer = useRef<THREE.Group>(null);
  const stander = useRef<THREE.Group>(null);
  const farRef = useRef<THREE.Mesh>(null);
  const nearRef = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const standMats = useRef<Record<string, THREE.MeshBasicMaterial | null>>({});
  const flyMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const geo = useMemo(() => ({ far: layerGeometry(FARP.x, FARP.y, scale), body: layerGeometry(0.5, 0.5, scale), near: layerGeometry(NEARP.x, NEARP.y, scale) }), [scale]);
  const pos = useRef(act.current.at.clone());
  const vel = useRef(new THREE.Vector3());
  const mix = useRef(0); // 0 = flying, 1 = standing
  const land = useRef(0); // bounce on touchdown
  const shown = useRef<Exclude<Pose, "fly">>("present");

  const trip = useRef({ from: act.current.at.clone(), to: act.current.at.clone(), ctrl: act.current.at.clone(), t: 1, dur: 1 });
  const flare = useRef(0);
  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, DT_CAP);
    const r = rig.current;
    if (!r) return;
    const t = clock.elapsedTime;
    const { at, pose } = act.current;
    const tr = trip.current;
    // A new destination starts a new trip: an arc that rises first, then settles, eased so she
    // accelerates out and slows into the landing.
    if (tr.to.distanceTo(at) > 0.05) {
      tr.from.copy(pos.current); tr.to.copy(at);
      const dist = tr.from.distanceTo(tr.to);
      tr.ctrl.lerpVectors(tr.from, tr.to, 0.5);
      tr.ctrl.y += Math.min(1.2, 0.35 + dist * 0.25);
      tr.ctrl.z += 0.15;
      tr.dur = THREE.MathUtils.clamp(0.6 + dist * 0.42, 0.8, 2.6);
      tr.t = 0;
    }
    tr.t = Math.min(1, tr.t + dt / tr.dur);
    const e = tr.t < 1 ? (tr.t < 0.5 ? 2 * tr.t * tr.t : 1 - Math.pow(-2 * tr.t + 2, 2) / 2) : 1;
    const prev = pos.current.clone();
    const q = new THREE.Vector3();
    q.copy(tr.from).multiplyScalar((1 - e) * (1 - e)).addScaledVector(tr.ctrl, 2 * (1 - e) * e).addScaledVector(tr.to, e * e);
    if (pose === "fly" && tr.t >= 1) q.y += Math.sin(t * 0.9) * 0.06; // hover
    pos.current.copy(q);
    vel.current.copy(pos.current).sub(prev).divideScalar(Math.max(dt, 1e-3));
    r.position.copy(pos.current);
    const speed = vel.current.length();
    const arriving = tr.t > 0.7 && tr.t < 1; // wings spread wide to brake
    flare.current = THREE.MathUtils.damp(flare.current, arriving && pose !== "fly" ? 1 : 0, 6, dt);
    const near = tr.t >= 1;
    // Switch to the standing pose only once she has arrived; take off as soon as she must move.
    const wantStand = pose !== "fly" && near;
    const before = mix.current;
    mix.current = THREE.MathUtils.damp(mix.current, wantStand ? 1 : 0, 6, dt);
    if (before < 0.5 && mix.current >= 0.5) land.current = 1;
    land.current = Math.max(0, land.current - dt * 2.2);
    if (pose !== "fly") shown.current = pose;

    // flying layers
    if (flyer.current) {
      flyer.current.visible = mix.current < 0.98;
      const rate = (2.6 + Math.min(speed, 2) * 1.6) * (1 - flare.current * 0.45);
      const amp = animate ? (0.2 + Math.min(speed, 2) * 0.08) * (1 + flare.current * 0.9) : 0;
      const beat = Math.sin(t * rate);
      const spread = flare.current * 0.35; // wings held high and wide while braking
      if (farRef.current) { farRef.current.rotation.z = 0.12 + spread + beat * amp; farRef.current.rotation.x = -0.1 + beat * 0.08; }
      if (nearRef.current) { nearRef.current.rotation.z = -0.08 - spread - beat * amp * 1.15; nearRef.current.rotation.x = 0.1 - beat * 0.1; }
      // bank into turns, pitch up when braking
      flyer.current.rotation.z = THREE.MathUtils.damp(flyer.current.rotation.z, THREE.MathUtils.clamp(-vel.current.x * 0.18 * face, -0.3, 0.3), 3, dt);
      flyer.current.rotation.x = THREE.MathUtils.damp(flyer.current.rotation.x, flare.current * 0.25 - Math.min(speed, 2) * 0.05, 3, dt);
      flyer.current.position.y = Math.sin(t * rate + 1.2) * 0.025;
      flyMats.current.forEach((m) => { if (m) m.opacity = 1 - mix.current; });
    }
    // standing pose: a little squash on landing, then a gentle breathing sway
    if (stander.current) {
      stander.current.visible = mix.current > 0.02;
      const squash = land.current > 0 ? Math.sin(land.current * Math.PI) * 0.12 : 0;
      const breathe = 1 + Math.sin(t * 2.1) * 0.012;
      stander.current.scale.set(face * (1 + squash) * breathe, (1 - squash) * breathe, 1);
      stander.current.rotation.z = Math.sin(t * 1.3) * 0.02;
      Object.entries(standMats.current).forEach(([key, m]) => { if (m) m.opacity = key === shown.current ? mix.current : 0; });
    }
    if (shadow.current) {
      const h = pos.current.y - (act.current.pose === "fly" ? 0 : height / 2);
      shadow.current.position.y = -pos.current.y + 0.012;
      shadow.current.scale.setScalar(Math.max(0.4, 1.15 - h * 0.25));
      (shadow.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + mix.current * 0.08;
    }
  });

  const flyMat = (map: THREE.Texture, i: number) => <meshBasicMaterial ref={(m) => { if (m) flyMats.current[i] = m; }} map={map} transparent alphaTest={0.04} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />;
  return (
    <group ref={rig}>
      <group ref={flyer} scale={[face, 1, 1]} rotation={[0, 0.25, 0]}>
        <mesh ref={farRef} geometry={geo.far} position={[(FARP.x - 0.5) * IMG_W * scale, -(FARP.y - 0.5) * IMG_H * scale, -0.06]}>{flyMat(far, 0)}</mesh>
        <mesh geometry={geo.body}>{flyMat(body, 1)}</mesh>
        <mesh ref={nearRef} geometry={geo.near} position={[(NEARP.x - 0.5) * IMG_W * scale, -(NEARP.y - 0.5) * IMG_H * scale, 0.07]}>{flyMat(near, 2)}</mesh>
      </group>
      <group ref={stander} visible={false}>
        {(Object.keys(POSES) as (keyof typeof POSES)[]).map((key) => {
          const d = POSES[key];
          const h = height, w = (d.w / d.h) * h;
          return (
            <mesh key={key} position={[0, 0, key === "think" ? 0.002 : 0]}>
              <planeGeometry args={[w, h]} />
              <meshBasicMaterial ref={(m) => { standMats.current[key] = m; }} map={poseTex[key]} transparent opacity={0} alphaTest={0.04} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
            </mesh>
          );
        })}
      </group>
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.36, 24]} />
        <meshBasicMaterial color={ink} transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

/* ── A stream of glowing particles from one point to another (Vita's work in motion) ──── */
function Stream({ from, to, on, color = "#1ea99b", count = 14 }: { from: [number, number, number]; to: [number, number, number]; on: boolean; color?: string; count?: number }) {
  const parts = useRef<THREE.Mesh[]>([]);
  const a = useMemo(() => new THREE.Vector3(...from), [from]);
  const b = useMemo(() => new THREE.Vector3(...to), [to]);
  const strength = useRef(0);
  useFrame(({ clock }, dt) => {
    strength.current = THREE.MathUtils.damp(strength.current, on ? 1 : 0, 6, dt);
    parts.current.forEach((m, i) => {
      if (!m) return;
      const u = (clock.elapsedTime * 0.55 + i / count) % 1;
      m.position.lerpVectors(a, b, u);
      m.position.y += Math.sin(u * Math.PI) * 0.25 + Math.sin(clock.elapsedTime * 7 + i) * 0.03;
      m.position.x += Math.cos(clock.elapsedTime * 5 + i * 1.7) * 0.03;
      const s = strength.current * (0.5 + Math.sin(u * Math.PI) * 0.6);
      m.scale.setScalar(Math.max(0.001, s));
    });
  });
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) parts.current[i] = el; }} scale={0.001}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={glow(color)} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ── One glowing orb that travels from A to B when fired, then waits ──────────────────── */
function Orb({ from, to, go, color = "#8a6fe0", seconds = 1.2, trail }: { from: [number, number, number]; to: [number, number, number]; go: boolean; color?: string; seconds?: number; trail?: boolean }) {
  const m = useRef<THREE.Mesh>(null);
  const u = useRef(0);
  const a = useMemo(() => new THREE.Vector3(...from), [from]);
  const b = useMemo(() => new THREE.Vector3(...to), [to]);
  useFrame((_, dt) => {
    if (!m.current) return;
    u.current = go ? Math.min(1, u.current + dt / seconds) : 0;
    const k = u.current;
    m.current.visible = go && k < 1;
    m.current.position.lerpVectors(a, b, k);
    m.current.position.y += Math.sin(k * Math.PI) * 0.5;
    m.current.scale.setScalar(0.6 + Math.sin(k * Math.PI) * 0.6);
  });
  void trail;
  return (
    <mesh ref={m} visible={false}>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshBasicMaterial color={glow(color)} toneMapped={false} />
    </mesh>
  );
}

/* ── Typing dots, for when Vita is "thinking" ─────────────────────────────────────────── */
const Dots = () => (
  <span className="inline-flex items-center gap-0.5 align-middle">
    {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${i * 0.15}s` }} />)}
  </span>
);

/* ── Shared set pieces ────────────────────────────────────────────────────────────────── */
function Floor({ w, d, color = "#f3f8f8" }: { w: number; d: number; color?: string }) {
  return (
    <group>
      <RoundedBox args={[w, 0.3, d]} radius={0.16} smoothness={4} position={[0, -0.15, 0]} receiveShadow>
        <meshStandardMaterial color="#dfeaeb" roughness={0.95} />
      </RoundedBox>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} receiveShadow>
        <planeGeometry args={[w - 0.4, d - 0.4]} />
        <meshStandardMaterial color={color} roughness={0.38} metalness={0.02} />
      </mesh>
    </group>
  );
}

function Walls({ w, d, h = 1.9, color = "#eef3f4" }: { w: number; d: number; h?: number; color?: string }) {
  return (
    <group>
      <mesh position={[0, h / 2, -d / 2 + 0.17]} receiveShadow castShadow>
        <boxGeometry args={[w - 0.4, h, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[-w / 2 + 0.17, h / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.12, h, d - 0.4]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Window({ x, z, w = 0.9, h = 0.7, y = 1.1, rot = 0 }: { x: number; z: number; w?: number; h?: number; y?: number; rot?: number }) {
  return (
    <mesh position={[x, y, z]} rotation={[0, rot, 0]}>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial color="#bfe6f5" emissive="#8fd3ee" emissiveIntensity={0.25} roughness={0.2} />
    </mesh>
  );
}

function Plant({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.12, 0]} castShadow><cylinderGeometry args={[0.1, 0.08, 0.24, 12]} /><meshStandardMaterial color="#e3cdb6" /></mesh>
      <mesh position={[0, 0.42, 0]} castShadow><sphereGeometry args={[0.22, 14, 14]} /><meshStandardMaterial color="#9fd3c4" roughness={0.9} /></mesh>
    </group>
  );
}

function Desk({ x, z, w = 1.3, rot = 0, children }: { x: number; z: number; w?: number; rot?: number; children?: React.ReactNode }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow><boxGeometry args={[w, 0.05, 0.6]} /><meshStandardMaterial color="#ffffff" roughness={0.6} /></mesh>
      {[-w / 2 + 0.08, w / 2 - 0.08].map((lx) => (
        <mesh key={lx} position={[lx, 0.2, 0]} castShadow><boxGeometry args={[0.05, 0.4, 0.5]} /><meshStandardMaterial color="#cfdadc" /></mesh>
      ))}
      {children}
    </group>
  );
}

function Monitor({ x = 0, z = -0.12, w = 0.52, h = 0.34, lit = true, color = "#1ea99b", children }: { x?: number; z?: number; w?: number; h?: number; lit?: boolean; color?: string; children?: React.ReactNode }) {
  return (
    <group position={[x, 0.45, z]}>
      <mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.06, 0.08, 0.12, 12]} /><meshStandardMaterial color="#9aa7aa" /></mesh>
      <mesh position={[0, 0.12 + h / 2, 0]} castShadow><boxGeometry args={[w, h, 0.03]} /><meshStandardMaterial color="#2b3a46" roughness={0.5} /></mesh>
      <mesh position={[0, 0.12 + h / 2, 0.017]}>
        <planeGeometry args={[w - 0.04, h - 0.04]} />
        <meshStandardMaterial color={lit ? "#0e2343" : "#111827"} emissive={lit ? color : "#000"} emissiveIntensity={lit ? 0.9 : 0} toneMapped={false} />
      </mesh>
      {children}
    </group>
  );
}

function Chair({ x, z, rot = 0, color = "#1ea99b", low = false }: { x: number; z: number; rot?: number; color?: string; low?: boolean }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.24, 0]} castShadow><boxGeometry args={[0.36, 0.05, 0.36]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0, low ? 0.34 : 0.42, -0.16]} castShadow><boxGeometry args={[0.36, low ? 0.2 : 0.36, 0.05]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0, 0.11, 0]}><cylinderGeometry args={[0.03, 0.03, 0.22, 8]} /><meshStandardMaterial color="#9aa7aa" /></mesh>
    </group>
  );
}

const still = { current: 0 } as React.MutableRefObject<number>;

/* ── Floating card (DOM) anchored in 3D, shown when `show` ─────────────────────────────── */
function Card({ pos, show, w = 230, children, df = 4.4 }: { pos: [number, number, number]; show: boolean; w?: number; children: React.ReactNode; df?: number }) {
  const { size } = useThree();
  const k = size.width < 480 ? 0.56 : size.width < 768 ? 0.72 : 1; // smaller cards on small stages
  return (
    <Html position={pos} center distanceFactor={df * k} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <div
        className="origin-bottom rounded-2xl border border-white/80 bg-white/95 p-3 text-left shadow-[0_18px_40px_-20px_rgba(14,35,67,0.5)] backdrop-blur transition-[opacity,transform] duration-500"
        style={{ width: w, opacity: show ? 1 : 0, transform: show ? "translateY(0) scale(1)" : "translateY(10px) scale(0.92)" }}
      >
        {children}
      </div>
    </Html>
  );
}

const Bubble = ({ me, children }: { me?: boolean; children: React.ReactNode }) => (
  <div className={`max-w-[92%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${me ? "ml-auto rounded-br-md bg-[#0e2343] text-white" : "rounded-bl-md bg-slate-100 text-[#0e2343]"}`}>
    <span className={me ? "text-white" : "text-[#0e2343]"}>{children}</span>
  </div>
);

/* ── Screen 1: the patient's home ─────────────────────────────────────────────────────── */
function HomeSet({ clock, animate }: { clock: ClockRef; animate: boolean }) {
  const [phase, setPhase] = useState(0);
  const walk = useRef(0);
  const phone = useRef<THREE.Mesh>(null);
  // Vita: hovers in (listening), lands beside the patient to talk, steps over to present the
  // doctors, sends the token to the phone, then takes off ahead of the patient.
  const act = useRef<Act>({ at: new THREE.Vector3(0.9, 1.6, 0.9), pose: "fly" });
  useFrame(({ clock: c }, rawDt) => {
    const dt = Math.min(rawDt, DT_CAP);
    const on = clock.current.screen === "find";
    const t = on ? clock.current.t : 0;
    const p = !on ? 0 : t < 1.4 ? 1 : t < 3.6 ? 2 : t < 6.4 ? 3 : t < 8.8 ? 4 : 5;
    if (p !== phase) setPhase(p);
    const a = act.current;
    if (p <= 1) { a.at.set(0.9, 1.6, 0.9); a.pose = "fly"; }
    else if (p === 2) { a.at.set(0.35, 0.4, 1.05); a.pose = "think"; }
    else if (p === 3) { a.at.set(0.95, 0.4, 1.2); a.pose = "present"; }
    else if (p === 4) { a.at.set(0.95, 0.4, 1.2); a.pose = "happy"; }
    else { a.at.set(2.2, 1.7, 0.4); a.pose = "fly"; }
    if (phone.current) {
      const m = phone.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = on && animate ? (p === 4 ? 2.4 : 1.2) + Math.sin(c.elapsedTime * 5) * 0.5 : 0.2;
    }
    walk.current = THREE.MathUtils.damp(walk.current, p >= 5 ? 1 : 0, 6, dt);
    void dt;
  });
  const docs = [
    { n: "Dr. A. Kumar", s: "General Physician · 2.1 km · ₹300", t: "Today 11:30", r: "4.8", pick: true },
    { n: "Dr. S. Anand", s: "Chest Specialist · 3.4 km · ₹500", t: "Today 16:00", r: "4.7", pick: false },
  ];
  return (
    <group position={[X.home, 0, 0]}>
      <Floor w={6} d={5} color="#fbf6ef" />
      <Walls w={6} d={5} color="#f6ebdd" />
      <Window x={0.4} z={-2.24} />
      {/* sofa */}
      <group position={[-1.3, 0, -0.9]}>
        <mesh position={[0, 0.2, 0]} castShadow><boxGeometry args={[1.5, 0.3, 0.7]} /><meshStandardMaterial color="#d9c6ef" /></mesh>
        <mesh position={[0, 0.5, -0.28]} castShadow><boxGeometry args={[1.5, 0.35, 0.15]} /><meshStandardMaterial color="#cdb6ea" /></mesh>
      </group>
      <Plant x={-2.3} z={-1.7} />
      <Plant x={2.2} z={-1.8} />
      {/* rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, 0.004, 0.4]}><circleGeometry args={[1.3, 32]} /><meshStandardMaterial color="#f1e2d0" /></mesh>
      {/* the patient, standing with the phone */}
      <group position={[-0.4, 0, 0.5]} rotation={[0, 0.6, 0]}>
        <Person look={{ shirt: "#8a6fe0", skin: "#c98a62", bag: false }} walk={walk} scale={1.35} />
        <mesh ref={phone} position={[0.13, 0.52, 0.1]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.05, 0.085, 0.01]} />
          <meshStandardMaterial color="#ffffff" emissive="#8a6fe0" emissiveIntensity={1} toneMapped={false} />
        </mesh>
      </group>
      <Vita act={act} animate={animate} face={1} width={1.25} />
      {/* the patient's words reach Vita; the booking token goes back to the phone */}
      <Stream from={[-0.25, 0.65, 0.65]} to={[0.4, 0.75, 1.05]} on={phase === 2} color="#8a6fe0" count={10} />
      <Orb from={[0.95, 0.7, 1.2]} to={[-0.25, 0.6, 0.65]} go={phase === 4} color="#1ea99b" seconds={1.1} />

      {/* conversation and result cards */}
      <Card pos={[-1.7, 2.3, 0.4]} show={phase >= 1} w={200}>
        <Bubble me>Fever and cough for 3 days. My chest hurts when I breathe.</Bubble>
      </Card>
      <Card pos={[0.35, 1.55, 1.05]} show={phase === 2} w={160}>
        <p className="text-[11px] text-slate-500">Vita is listening <Dots /></p>
      </Card>
      <Card pos={[1.5, 2.45, 0.4]} show={phase >= 3} w={220}>
        <Bubble>That should be seen today by a general physician. Two good options near you:</Bubble>
      </Card>
      <Card pos={[2.05, 1.35, 1.2]} show={phase >= 3} w={236}>
        <div className="space-y-1.5">
          {docs.map((d) => (
            <div key={d.n} className={`flex items-center justify-between gap-2 rounded-xl border px-2.5 py-2 transition-colors ${phase >= 4 && d.pick ? "border-[#1ea99b] bg-[#effaf8]" : "border-slate-200 bg-white"}`}>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-[#0e2343]">{d.n}</p>
                <p className="text-[10.5px] text-slate-500">{d.s}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="flex items-center justify-end gap-0.5 text-[10.5px] text-amber-600"><Star className="h-2.5 w-2.5 fill-current" />{d.r}</p>
                <p className="text-[10.5px] font-semibold text-[#12857a]">{phase >= 4 && d.pick ? "Booked ✓" : d.t}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card pos={[-1.7, 1.35, 1.1]} show={phase >= 5} w={200}>
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0e2343]"><MapPin className="h-3.5 w-3.5 text-[#8a6fe0]" />Token A-14, 11:30</p>
        <p className="mt-0.5 text-[11px] text-slate-500">Sent on WhatsApp with directions. Leave by 11:05.</p>
      </Card>
    </group>
  );
}

/* ── Screen 2b: the consulting room inside 1HMS ───────────────────────────────────────── */
const HMS_STEPS = [
  { t: 0.2, text: "Checked in from the booking, token A-14" },
  { t: 1.6, text: "Vitals recorded: 101.2°F, SpO₂ 96%" },
  { t: 3.0, text: "Notes and prescription drafted from the consultation" },
  { t: 4.6, text: "Dr. Kumar reviewed and signed" },
  { t: 5.8, text: "Chest X-ray ordered → sent to 1Rad" },
  { t: 6.8, text: "Medicines sent to 1Pharma, bill updated" },
  { t: 7.8, text: "Follow-up reminder set for 5 days" },
];

function RoomSet({ clock, animate }: { clock: ClockRef; animate: boolean }) {
  const [n, setN] = useState(0);
  // Vita: flies in and lands on the desk by the screen, reads and works (particles into the
  // monitor), cheers when the doctor signs, then stands and sends the orders out.
  const act = useRef<Act>({ at: new THREE.Vector3(-1.5, 1.9, 0.6), pose: "fly" });
  useFrame(() => {
    const on = clock.current.screen === "hms";
    const t = on ? clock.current.t - 3.6 : -1; // the room starts after the campus shot
    const k = t < 0 ? 0 : HMS_STEPS.filter((s) => t >= s.t).length;
    if (k !== n) setN(k);
    const a = act.current;
    if (t < -0.6) { a.at.set(-1.5, 1.9, 0.6); a.pose = "fly"; }
    else if (k < 4) { a.at.set(-0.42, 0.8, -0.55); a.pose = "think"; }
    else if (k === 4) { a.at.set(-0.42, 0.8, -0.55); a.pose = "happy"; }
    else { a.at.set(-0.42, 0.8, -0.55); a.pose = "present"; }
  });
  const done = n >= 4;
  return (
    <group position={[X.room, 0, 0]}>
      <Floor w={6.4} d={5} />
      <Walls w={6.4} d={5} />
      <Window x={-1.2} z={-2.24} w={1.3} />
      <Window x={1.6} z={-2.24} w={1.3} />
      <Plant x={2.6} z={-1.8} />
      {/* doctor's desk, screen, doctor and patient */}
      <Desk x={0.2} z={-0.6} w={1.7}>
        <Monitor x={0.35} z={-0.14} lit color={done ? "#1ea99b" : "#1599db"} />
        <mesh position={[-0.35, 0.47, 0.05]}><boxGeometry args={[0.3, 0.02, 0.2]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
      </Desk>
      <Chair x={0.2} z={-1.25} />
      <group position={[0.2, 0.02, -1.15]}>
        <Person look={{ shirt: "#1ea99b", coat: true, skin: "#b8784f" }} walk={still} scale={1.35} />
      </group>
      <Chair x={0.2} z={0.35} rot={Math.PI} color="#cbd5e1" low />
      <group position={[0.2, 0.02, 0.3]} rotation={[0, Math.PI, 0]}>
        <Person look={{ shirt: "#8a6fe0", skin: "#c98a62" }} walk={still} scale={1.35} />
      </group>
      {/* examination bed and a nurse */}
      <group position={[-2.1, 0, -0.3]}>
        <mesh position={[0, 0.32, 0]} castShadow><boxGeometry args={[0.8, 0.14, 1.7]} /><meshStandardMaterial color="#e6f4f1" /></mesh>
        {[[-0.32, -0.75], [0.32, -0.75], [-0.32, 0.75], [0.32, 0.75]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.13, z]}><cylinderGeometry args={[0.025, 0.025, 0.26, 8]} /><meshStandardMaterial color="#9aa7aa" /></mesh>
        ))}
      </group>
      <group position={[-1.4, 0.02, 0.9]} rotation={[0, 2.4, 0]}>
        <Person look={{ shirt: "#1ea99b", skin: "#e4b08a", hair: "#3b2a22" }} walk={still} scale={1.35} />
      </group>
      <Vita act={act} animate={animate} width={1.15} height={0.7} />
      {/* her work flows into the screen; signed orders leave for 1Rad and 1Pharma */}
      <Stream from={[-0.3, 0.95, -0.55]} to={[0.55, 0.85, -0.72]} on={n >= 1 && n < 4} color="#1ea99b" count={12} />
      <Orb from={[0.55, 0.9, -0.72]} to={[3.0, 1.3, -0.2]} go={n >= 5} color="#1599db" seconds={1.3} />
      <Orb from={[0.55, 0.9, -0.72]} to={[3.0, 0.6, 1.4]} go={n >= 6} color="#22a559" seconds={1.3} />
      <Card pos={[-0.42, 1.35, -0.55]} show={n >= 1 && n < 3} w={150}>
        <p className="text-[11px] text-slate-500">Writing the notes <Dots /></p>
      </Card>

      {/* the agent's log, growing line by line */}
      <Card pos={[2.35, 1.95, 0.3]} show={n > 0} w={240}>
        <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#12857a]"><span className="h-1.5 w-1.5 rounded-full bg-[#1ea99b]" />1HMS Vita · working</p>
        <ol className="space-y-1">
          {HMS_STEPS.slice(0, n).map((s) => (
            <li key={s.text} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-[#0e2343]">
              <span className="mt-[3px] grid h-3 w-3 shrink-0 place-items-center rounded-full bg-[#1ea99b] text-white"><Check className="h-2 w-2" strokeWidth={4} /></span>
              <span className="text-[#0e2343]">{s.text}</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card pos={[-1.9, 2.25, -0.3]} show={n >= 3 && n < 5} w={190}>
        <p className="text-[11px] font-semibold text-[#0e2343]">Prescription draft</p>
        <p className="mt-0.5 text-[10.5px] leading-snug text-slate-600">Amoxicillin 500 mg 1-0-1 × 5 days · Paracetamol 650 mg if fever · Chest X-ray PA</p>
        <p className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${n >= 4 ? "bg-[#1ea99b] text-white" : "bg-slate-100 text-slate-600"}`}><span className={n >= 4 ? "text-white" : "text-slate-600"}>{n >= 4 ? "Signed by Dr. Kumar" : "Waiting for the doctor"}</span></p>
      </Card>
    </group>
  );
}

/* ── Screen 3: radiology with 1Rad ────────────────────────────────────────────────────── */
function RadSet({ clock, animate }: { clock: ClockRef; animate: boolean }) {
  const [phase, setPhase] = useState(0);
  const ring = useRef<THREE.Mesh>(null);
  const table = useRef<THREE.Group>(null);
  const report = useRef<THREE.Group>(null);
  // Vita: reads the scan at the gantry, flies the draft to the console, cheers at the signature,
  // then sees the report off to 1HMS.
  const act = useRef<Act>({ at: new THREE.Vector3(-1.5, 1.9, 0.9), pose: "fly" });
  const sent = useRef(0);
  useFrame(({ clock: c }, rawDt) => {
    const dt = Math.min(rawDt, DT_CAP);
    const on = clock.current.screen === "rad";
    const t = on ? clock.current.t : 0;
    const p = !on ? 0 : t < 2.6 ? 1 : t < 5.2 ? 2 : t < 7.6 ? 3 : t < 9.2 ? 4 : 5;
    if (p !== phase) setPhase(p);
    if (ring.current && animate) ring.current.rotation.z += dt * (p === 1 ? 5 : 0.6);
    if (table.current) table.current.position.z = THREE.MathUtils.damp(table.current.position.z, p === 1 ? -0.35 : 0.25, 2, dt);
    const a = act.current;
    if (p <= 1) { a.at.set(-1.5, 1.9, 0.9); a.pose = p === 1 ? "think" : "fly"; }
    else if (p === 2) { a.at.set(-1.5, 1.9, 0.9); a.pose = "think"; }
    else if (p === 3) { a.at.set(1.25, 0.82, 1.45); a.pose = "present"; }
    else if (p === 4) { a.at.set(1.25, 0.82, 1.45); a.pose = "happy"; }
    else { a.at.set(1.25, 0.82, 1.45); a.pose = "present"; }
    // the signed report flies off to 1HMS (back toward the hospital, to the left)
    if (report.current) {
      sent.current = p >= 5 ? Math.min(1, sent.current + dt / 1.6) : 0;
      const u = sent.current;
      report.current.visible = p >= 4;
      report.current.position.set(1.6 - u * 9, 1.25 + Math.sin(u * Math.PI) * 1.6, 0.2 - u * 0.5);
      report.current.rotation.y = c.elapsedTime * 2 * u;
    }
  });
  return (
    <group position={[X.rad, 0, 0]}>
      <Floor w={6.6} d={5.2} color="#eef4f6" />
      <Walls w={6.6} d={5.2} color="#e3edf0" />
      <Window x={1.8} z={-2.34} w={1.6} y={1.2} />
      {/* CT gantry and table */}
      <group position={[-1.5, 0, -0.5]}>
        <mesh position={[0, 0.95, 0]} castShadow>
          <torusGeometry args={[0.85, 0.28, 16, 40]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        <mesh ref={ring} position={[0, 0.95, 0.02]}>
          <torusGeometry args={[0.62, 0.06, 10, 40]} />
          <meshStandardMaterial color="#1599db" emissive="#1599db" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow><boxGeometry args={[1.6, 0.6, 0.5]} /><meshStandardMaterial color="#f1f5f7" /></mesh>
        <group ref={table} position={[0, 0, 0.25]}>
          <mesh position={[0, 0.72, 0.9]} castShadow><boxGeometry args={[0.6, 0.08, 2.2]} /><meshStandardMaterial color="#dfe8ec" /></mesh>
          <mesh position={[0, 0.36, 1.5]}><boxGeometry args={[0.5, 0.64, 0.5]} /><meshStandardMaterial color="#cfdadc" /></mesh>
          {/* patient lying on the table */}
          <group position={[0, 0.8, 1.3]} rotation={[-Math.PI / 2, 0, 0]}>
            <Person look={{ shirt: "#8a6fe0", skin: "#c98a62" }} walk={still} scale={1.3} />
          </group>
        </group>
      </group>
      {/* console desk with the radiologist */}
      <Desk x={1.8} z={0.9} w={1.5} rot={-0.35}>
        <Monitor x={-0.3} z={-0.14} w={0.6} h={0.38} color="#1599db" />
        <Monitor x={0.38} z={-0.12} w={0.46} h={0.32} color="#1ea99b" />
      </Desk>
      <Chair x={2.1} z={1.55} rot={2.8} color="#334155" low />
      <group position={[2.1, 0.02, 1.5]} rotation={[0, 2.85, 0]}>
        <Person look={{ shirt: "#1599db", coat: true, skin: "#d4a07a" }} walk={still} scale={1.35} />
      </group>
      <Plant x={2.9} z={-1.9} />
      <Vita act={act} animate={animate} width={1.15} height={0.7} />
      {/* the scan streams into Vita while she reads; her draft flows into the console */}
      <Stream from={[-1.5, 0.95, -0.5]} to={[-1.5, 1.6, 0.9]} on={phase === 2} color="#1599db" count={12} />
      <Stream from={[1.25, 1.0, 1.45]} to={[1.5, 0.85, 0.75]} on={phase === 3} color="#1599db" count={10} />
      <Card pos={[-1.5, 2.55, 0.9]} show={phase === 2} w={150}>
        <p className="text-[11px] text-slate-500">Reading the scan <Dots /></p>
      </Card>

      {/* the report, as a little document that flies to 1HMS once signed */}
      <group ref={report} visible={false}>
        <mesh castShadow><boxGeometry args={[0.34, 0.44, 0.02]} /><meshStandardMaterial color="#ffffff" /></mesh>
        <mesh position={[0, 0.1, 0.012]}><planeGeometry args={[0.22, 0.03]} /><meshStandardMaterial color="#0e2343" /></mesh>
        <mesh position={[0, 0.02, 0.012]}><planeGeometry args={[0.22, 0.02]} /><meshStandardMaterial color="#94a3b8" /></mesh>
        <mesh position={[0, -0.04, 0.012]}><planeGeometry args={[0.22, 0.02]} /><meshStandardMaterial color="#94a3b8" /></mesh>
        <mesh position={[0.06, -0.14, 0.012]}><circleGeometry args={[0.05, 16]} /><meshStandardMaterial color="#1ea99b" /></mesh>
      </group>

      <Card pos={[-1.6, 2.45, -0.3]} show={phase === 1} w={170}>
        <p className="text-[11px] font-semibold text-[#0e2343]">Chest X-ray in progress</p>
        <p className="text-[10.5px] text-slate-500">Study goes straight to 1Rad cloud PACS</p>
      </Card>
      <Card pos={[-0.3, 2.45, 0.4]} show={phase >= 3 && phase < 5} w={240}>
        <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-sky-700"><span className="h-1.5 w-1.5 rounded-full bg-[#1599db]" />1Rad Vita · draft ready</p>
        <div className="relative h-16 overflow-hidden rounded-lg bg-[#0e2343]">
          <div className="absolute left-[18%] top-[18%] h-[62%] w-[26%] rounded-full border border-white/30" />
          <div className="absolute left-[56%] top-[18%] h-[62%] w-[26%] rounded-full border border-white/30" />
          <div className={`absolute left-[58%] top-[52%] h-[24%] w-[18%] rounded-md border-2 border-[#1ea99b] transition-opacity duration-700 ${phase >= 2 ? "opacity-100" : "opacity-0"}`} />
          <span className="absolute right-1.5 top-1 rounded bg-[#1ea99b] px-1 text-[9px] font-semibold text-white">Opacity 0.91</span>
        </div>
        <p className={`mt-1.5 text-[10.5px] leading-snug text-slate-600 transition-opacity duration-500 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
          <span className="font-semibold text-[#0e2343]">Draft impression:</span> patchy opacity, right lower zone, suggestive of consolidation. Clinical correlation advised.
        </p>
      </Card>
      <Card pos={[2.2, 2.35, 0.6]} show={phase >= 4} w={200}>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0e2343]"><FileText className="h-3.5 w-3.5 text-[#1ea99b]" />{phase >= 5 ? "Report sent to 1HMS" : "Radiologist reviewed and signed"}</p>
        <p className="mt-0.5 text-[10.5px] text-slate-500">{phase >= 5 ? "Dr. Kumar sees it on the patient's record" : "Dr. Mehta edited one line and signed"}</p>
      </Card>
    </group>
  );
}

/* ── Camera direction for the three screens ───────────────────────────────────────────── */
type Shot = { pos: [number, number, number]; look: [number, number, number]; fov: number };
const SHOTS: Record<Screen, (t: number) => Shot> = {
  find: () => ({ pos: [X.home + 0.6, 2.3, 5.9], look: [X.home + 0.3, 1.2, 0], fov: 32 }),
  hms: (t) => (t < 3.6
    ? { pos: [X.campus + 5.4, 5.6, 10.4], look: [X.campus + 0.6, -0.3, 0.9], fov: 34 }
    : { pos: [X.room + 0.4, 2.4, 5.7], look: [X.room + 0.2, 1.15, -0.2], fov: 32 }),
  rad: () => ({ pos: [X.rad + 0.2, 2.6, 6.1], look: [X.rad + 0.1, 1.2, 0], fov: 32 }),
};

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
type Rig = { pos: THREE.Vector3; look: THREE.Vector3; fov: number };

function Director({ clock, pointer }: { clock: ClockRef; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera, size } = useThree();
  const from = useRef<Rig>({ pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 32 });
  const to = useRef<Rig>({ pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 32 });
  const cur = useRef<Rig>({ pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 32 });
  const move = useRef({ t: 1, dur: 1, key: "" });
  const soft = useRef({ x: 0, y: 0 });
  const first = useRef(true);
  useFrame(({ clock: c }, rawDt) => {
    const dt = Math.min(rawDt, DT_CAP);
    const s = SHOTS[clock.current.screen](clock.current.t);
    const aspect = size.width / Math.max(1, size.height);
    const back = size.width < 480 ? 2.0 : aspect < 1.05 ? 1.5 : aspect < 1.2 ? 1.2 : 1.05;
    const key = `${clock.current.screen}:${s.pos.join(",")}`;
    if (key !== move.current.key) {
      // A new shot: ease from wherever the camera is now, over a time that suits the distance.
      from.current.pos.copy(cur.current.pos); from.current.look.copy(cur.current.look); from.current.fov = cur.current.fov;
      to.current.pos.set(s.pos[0], s.pos[1] * back, s.pos[2] * back); to.current.look.set(...s.look); to.current.fov = s.fov;
      const dist = from.current.pos.distanceTo(to.current.pos);
      move.current = { t: first.current ? 1 : 0, dur: THREE.MathUtils.clamp(0.9 + dist * 0.09, 1.2, 2.6), key };
      if (first.current) { cur.current.pos.copy(to.current.pos); cur.current.look.copy(to.current.look); cur.current.fov = s.fov; first.current = false; }
    }
    to.current.pos.set(s.pos[0], s.pos[1] * back, s.pos[2] * back); // keep tracking the screen size
    move.current.t = Math.min(1, move.current.t + dt / move.current.dur);
    const e = easeInOut(move.current.t);
    cur.current.pos.lerpVectors(from.current.pos, to.current.pos, e);
    cur.current.look.lerpVectors(from.current.look, to.current.look, e);
    cur.current.fov = THREE.MathUtils.lerp(from.current.fov, to.current.fov, e);
    // A breath of handheld drift and a slow follow of the cursor, so the shot never sits dead still.
    soft.current.x = THREE.MathUtils.damp(soft.current.x, pointer.current.x, 1.5, dt);
    soft.current.y = THREE.MathUtils.damp(soft.current.y, pointer.current.y, 1.5, dt);
    const t = c.elapsedTime;
    const driftX = Math.sin(t * 0.23) * 0.06 + Math.sin(t * 0.61) * 0.03;
    const driftY = Math.sin(t * 0.31 + 1) * 0.04;
    camera.position.set(cur.current.pos.x + soft.current.x * 0.5 + driftX, cur.current.pos.y + soft.current.y * 0.3 + driftY, cur.current.pos.z);
    camera.lookAt(cur.current.look.x + driftX * 0.4, cur.current.look.y + driftY * 0.4, cur.current.look.z);
    const cam = camera as THREE.PerspectiveCamera;
    if (Math.abs(cam.fov - cur.current.fov) > 0.01) { cam.fov = cur.current.fov; cam.updateProjectionMatrix(); }
  });
  return null;
}

// Daylight: an HDR sky for soft fill and reflections, a sun that follows the action for crisp
// shadows, and soft shadow edges.
function Lighting() {
  const light = useRef<THREE.DirectionalLight>(null);
  const { camera } = useThree();
  const fwd = useMemo(() => new THREE.Vector3(), []);
  const hdr = "/hdr/city.exr"; // a small HDR sky, served from /public
  useFrame(() => {
    const l = light.current;
    if (!l) return;
    camera.getWorldDirection(fwd);
    const cx = camera.position.x + fwd.x * 6;
    l.position.set(cx + 6, 10, 5);
    l.target.position.set(cx, 0, 0);
    l.target.updateMatrixWorld();
  });
  return (
    <>
      <SoftShadows size={18} samples={12} focus={0.6} />
      <Environment files={hdr} environmentIntensity={0.4} />
      <ambientLight intensity={0.2} />
      <directionalLight ref={light} intensity={1.6} color="#fff6ea" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} shadow-bias={-0.0003} shadow-normalBias={0.02} />
    </>
  );
}

// Glow for the particle streams and screens, contact shadows in the corners, smooth edges.
function Post() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom luminanceThreshold={1.0} luminanceSmoothing={0.15} intensity={0.7} mipmapBlur radius={0.55} />
      <SMAA />
    </EffectComposer>
  );
}

function Ticker({ clock, screen }: { clock: ClockRef; screen: Screen }) {
  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, DT_CAP);
    if (clock.current.screen !== screen) { clock.current.screen = screen; clock.current.t = 0; }
    else clock.current.t += dt;
  });
  return null;
}

/* ── The stage ────────────────────────────────────────────────────────────────────────── */
export default function StoryScene({ screen, onPick }: { screen: Screen; onPick: (s: Screen) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const clock = useRef({ screen, t: 0 });
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const [low, setLow] = useState(false); // weak device: lower resolution, no post-processing

  useEffect(() => {
    try { setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch { /* ignore */ }
    const el = wrap.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
      io.observe(el);
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { io?.disconnect(); window.removeEventListener("pointermove", onMove); };
  }, []);

  const animate = visible && !reduced;
  // During the hospital screen the campus plays the patient's arrival ("go"); otherwise it idles.
  const campusStage = screen === "hms" ? "go" : screen === "rad" ? "rad" : "book";

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows
        dpr={dpr}
        frameloop={animate ? "always" : "demand"}
        camera={{ position: [X.home + 0.6, 2.3, 5.9], fov: 32, near: 0.1, far: 120 }}
        flat
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance", stencil: false }}
      >
        <PerformanceMonitor onIncline={() => setDpr(Math.min(1.75, window.devicePixelRatio))} onDecline={() => { setDpr(1); setLow(true); }} flipflops={2} onFallback={() => { setDpr(1); setLow(true); }} />
        <color attach="background" args={["#f9fbfb"]} />
        <fog attach="fog" args={["#f9fbfb", 16, 40]} />
        <Ticker clock={clock} screen={screen} />
        <Director clock={clock} pointer={pointer} />
        <Lighting />
        <HomeSet clock={clock} animate={animate} />
        <Campus stage={campusStage} onPick={() => onPick("hms")} animate={animate} fixed people>
          <People stage={campusStage} animate={animate} />
        </Campus>
        <RoomSet clock={clock} animate={animate} />
        <RadSet clock={clock} animate={animate} />
        <ContactShadows position={[X.campus, CAMPUS_Y - 0.16, 0.4]} opacity={0.3} scale={14} blur={2.6} far={3} frames={1} />
        {!low && <Post />}
      </Canvas>
    </div>
  );
}
