"use client";

// Low-poly people and vehicles that bring the campus to life. Everything is built from
// primitives and animated with simple sine waves: legs swing, bodies bob, cars roll.
// Coordinates are in campus space (inside the Campus group).

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BUILDINGS, C, HOME, HUB, ROAD, type Stage } from "./HospitalScene";

const door = (k: string) => BUILDINGS.find((b) => b.key === k)!.door;
const V = (p: [number, number, number] | THREE.Vector3) => (p instanceof THREE.Vector3 ? p.clone() : new THREE.Vector3(...p));

/* ── One person ─────────────────────────────────────────────────────────────────────── */
export type Look = { shirt: string; skin?: string; hair?: string; coat?: boolean; bag?: boolean };

export function Person({ look, walk, phase = 0, scale = 1 }: { look: Look; walk: React.MutableRefObject<number>; phase?: number; scale?: number }) {
  const g = useRef<THREE.Group>(null);
  const l1 = useRef<THREE.Mesh>(null);
  const l2 = useRef<THREE.Mesh>(null);
  const a1 = useRef<THREE.Mesh>(null);
  const a2 = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const w = walk.current; // 0 = standing, 1 = full stride
    const t = clock.elapsedTime * 9 + phase;
    const s = Math.sin(t) * 0.55 * w;
    if (l1.current) l1.current.rotation.x = s;
    if (l2.current) l2.current.rotation.x = -s;
    if (a1.current) a1.current.rotation.x = -s * 0.8;
    if (a2.current) a2.current.rotation.x = s * 0.8;
    if (g.current) g.current.position.y = Math.abs(Math.sin(t)) * 0.012 * w + Math.sin(clock.elapsedTime * 1.6 + phase) * 0.004;
  });
  const skin = look.skin ?? "#d9a37a";
  const hair = look.hair ?? "#2b2420";
  const shirt = look.coat ? "#ffffff" : look.shirt;
  const leg = look.coat ? "#4b5563" : "#334155";
  return (
    <group ref={g} scale={scale}>
      {/* legs, hinged at the hip */}
      <mesh ref={l1} position={[-0.035, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.03, 0.17, 8]} />
        <meshStandardMaterial color={leg} roughness={0.9} />
      </mesh>
      <mesh ref={l2} position={[0.035, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.03, 0.17, 8]} />
        <meshStandardMaterial color={leg} roughness={0.9} />
      </mesh>
      {/* body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <capsuleGeometry args={[0.065, 0.12, 4, 10]} />
        <meshStandardMaterial color={shirt} roughness={0.8} />
      </mesh>
      {look.coat && (
        <mesh position={[0, 0.3, 0.035]}>
          <boxGeometry args={[0.05, 0.14, 0.04]} />
          <meshStandardMaterial color={look.shirt} roughness={0.8} />
        </mesh>
      )}
      {/* arms */}
      <mesh ref={a1} position={[-0.085, 0.33, 0]} castShadow>
        <capsuleGeometry args={[0.02, 0.1, 3, 8]} />
        <meshStandardMaterial color={shirt} roughness={0.8} />
      </mesh>
      <mesh ref={a2} position={[0.085, 0.33, 0]} castShadow>
        <capsuleGeometry args={[0.02, 0.1, 3, 8]} />
        <meshStandardMaterial color={shirt} roughness={0.8} />
      </mesh>
      {/* head and hair */}
      <mesh position={[0, 0.465, 0]} castShadow>
        <sphereGeometry args={[0.062, 16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.5, -0.01]}>
        <sphereGeometry args={[0.058, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={hair} roughness={0.9} />
      </mesh>
      {look.bag && (
        <mesh position={[0.1, 0.22, 0.02]}>
          <boxGeometry args={[0.03, 0.09, 0.07]} />
          <meshStandardMaterial color="#8a6fe0" roughness={0.8} />
        </mesh>
      )}
    </group>
  );
}

/* ── A person who walks back and forth along a path, pausing at each end ───────────── */
function Walker({ path, speed = 0.35, pause = 1.4, offset = 0, look, loop = false }: { path: THREE.Curve<THREE.Vector3>; speed?: number; pause?: number; offset?: number; look: Look; loop?: boolean }) {
  const g = useRef<THREE.Group>(null);
  const walk = useRef(1);
  const state = useRef({ u: offset % 1, dir: 1, wait: 0 });
  const len = useMemo(() => path.getLength(), [path]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    const s = state.current;
    if (s.wait > 0) { s.wait -= dt; walk.current = THREE.MathUtils.damp(walk.current, 0, 8, dt); }
    else {
      walk.current = THREE.MathUtils.damp(walk.current, 1, 8, dt);
      s.u += (dt * speed * s.dir) / len;
      if (loop) s.u = (s.u + 1) % 1;
      else if (s.u >= 1) { s.u = 1; s.dir = -1; s.wait = pause; }
      else if (s.u <= 0) { s.u = 0; s.dir = 1; s.wait = pause; }
    }
    if (!g.current) return;
    const p = path.getPointAt(THREE.MathUtils.clamp(s.u, 0, 1));
    g.current.position.copy(p);
    const tan = path.getTangentAt(THREE.MathUtils.clamp(s.u, 0.001, 0.999)).multiplyScalar(s.dir);
    tmp.copy(p).add(tan);
    g.current.lookAt(tmp);
  });
  return (
    <group ref={g}>
      <Person look={look} walk={walk} phase={offset * 7} scale={1.15} />
    </group>
  );
}

/* ── The patient: at home, then along the road, then from counter to counter ───────── */
function Patient({ stage, animate }: { stage: Stage; animate: boolean }) {
  const g = useRef<THREE.Group>(null);
  const walk = useRef(0);
  const glow = useRef<THREE.Mesh>(null);
  const pos = useRef(V(HOME).add(new THREE.Vector3(0.05, 0.05, 0.5)));
  const road = useRef(0);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const targets = useMemo(() => ({
    home: V(HOME).add(new THREE.Vector3(0.05, 0.05, 0.5)),
    hub: V(HUB).add(new THREE.Vector3(0.3, 0, 0.1)),
    hms: V(door("1hms")).add(new THREE.Vector3(0.2, 0, 0.08)),
    rad: V(door("1rad")).add(new THREE.Vector3(0.1, 0, 0.1)),
  }), []);

  useFrame(({ clock }, dt) => {
    const p = pos.current;
    let moving = false;
    if (stage === "find" || stage === "book") {
      road.current = 0;
      moving = step(p, targets.home, dt, 0.6, tmp);
    } else if (stage === "go") {
      if (animate) road.current = Math.min(1, road.current + dt / 3.4);
      const q = ROAD.getPointAt(road.current);
      moving = step(p, q, dt, 1.2, tmp) || road.current < 1;
      if (road.current < 1) { tmp.copy(ROAD.getTangentAt(Math.min(0.999, road.current))).add(p); }
    } else if (stage === "hms") {
      road.current = 1;
      moving = step(p, targets.hms, dt, 0.6, tmp);
    } else {
      road.current = 1;
      moving = step(p, targets.rad, dt, 0.6, tmp);
    }
    walk.current = THREE.MathUtils.damp(walk.current, moving ? 1 : 0, 8, dt);
    if (g.current) {
      g.current.position.copy(p);
      if (moving) g.current.lookAt(tmp.x, p.y, tmp.z);
      else if (stage === "find" || stage === "book") g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, 0.6, 4, dt);
    }
    if (glow.current) {
      const on = stage === "find" || stage === "book";
      const m = glow.current.material as THREE.MeshStandardMaterial;
      m.opacity = THREE.MathUtils.damp(m.opacity, on ? 0.9 : 0, 6, dt);
      m.emissiveIntensity = on ? 1.4 + Math.sin(clock.elapsedTime * 6) * 0.4 : 0;
    }
  });

  return (
    <group ref={g}>
      <Person look={{ shirt: "#8a6fe0", skin: "#c98a62", bag: true }} walk={walk} scale={1.15} />
      {/* the phone Vita is talking on */}
      <mesh ref={glow} position={[0.09, 0.4, 0.07]}>
        <boxGeometry args={[0.03, 0.05, 0.008]} />
        <meshStandardMaterial color="#ffffff" emissive="#8a6fe0" emissiveIntensity={1.2} transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Move `p` toward `to` at `speed`; returns true while still moving. `aim` receives the point to face.
function step(p: THREE.Vector3, to: THREE.Vector3, dt: number, speed: number, aim: THREE.Vector3) {
  const d = to.distanceTo(p);
  if (d < 0.01) return false;
  const k = Math.min(1, (speed * dt) / d);
  aim.copy(to);
  p.lerp(to, k);
  return d > 0.03;
}

/* ── Vehicles on the ring road around the campus ───────────────────────────────────── */
const RING_ROAD = new THREE.CatmullRomCurve3(
  [new THREE.Vector3(3.95, 0.03, -2.45), new THREE.Vector3(3.95, 0.03, 3.3), new THREE.Vector3(-3.95, 0.03, 3.3), new THREE.Vector3(-3.95, 0.03, -2.45)],
  true, "catmullrom", 0.08
);

function Vehicle({ offset, speed, kind }: { offset: number; speed: number; kind: "car" | "ambulance" }) {
  const g = useRef<THREE.Group>(null);
  const lamp = useRef<THREE.Mesh>(null);
  const u = useRef(offset);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }, dt) => {
    u.current = (u.current + dt * speed) % 1;
    if (!g.current) return;
    const p = RING_ROAD.getPointAt(u.current);
    g.current.position.copy(p);
    tmp.copy(RING_ROAD.getTangentAt(u.current)).add(p);
    g.current.lookAt(tmp);
    if (lamp.current) (lamp.current.material as THREE.MeshStandardMaterial).emissiveIntensity = Math.sin(clock.elapsedTime * 9) > 0 ? 2.2 : 0.2;
  });
  const body = kind === "ambulance" ? "#ffffff" : "#5b8def";
  return (
    <group ref={g}>
      <mesh position={[0, 0.09, 0]} castShadow>
        <boxGeometry args={[0.22, 0.12, kind === "ambulance" ? 0.46 : 0.4]} />
        <meshStandardMaterial color={body} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.19, kind === "ambulance" ? -0.02 : 0.02]} castShadow>
        <boxGeometry args={[0.19, kind === "ambulance" ? 0.12 : 0.08, kind === "ambulance" ? 0.3 : 0.2]} />
        <meshStandardMaterial color={kind === "ambulance" ? "#ffffff" : "#dbe7ff"} roughness={0.3} />
      </mesh>
      {kind === "ambulance" && (
        <>
          <mesh position={[0, 0.17, 0.16]}>
            <boxGeometry args={[0.1, 0.03, 0.01]} />
            <meshStandardMaterial color="#e5484d" />
          </mesh>
          <mesh position={[0, 0.17, 0.16]}>
            <boxGeometry args={[0.03, 0.1, 0.01]} />
            <meshStandardMaterial color="#e5484d" />
          </mesh>
          <mesh ref={lamp} position={[0, 0.27, -0.04]}>
            <boxGeometry args={[0.06, 0.03, 0.06]} />
            <meshStandardMaterial color="#e5484d" emissive="#ff3b3b" emissiveIntensity={1} toneMapped={false} />
          </mesh>
        </>
      )}
      {[[-0.1, -0.12], [0.1, -0.12], [-0.1, 0.12], [0.1, 0.12]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.04, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 10]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      ))}
    </group>
  );
}

function RingRoad() {
  return (
    <group>
      {[[0, -2.45, 7.9, 0.32], [0, 3.3, 7.9, 0.32], [3.95, 0.42, 0.32, 5.75], [-3.95, 0.42, 0.32, 5.75]].map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, 0.006, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[w, d]} />
          <meshStandardMaterial color="#e2eaec" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Everyone on campus ────────────────────────────────────────────────────────────── */
export default function People({ stage, animate }: { stage: Stage; animate: boolean }) {
  const paths = useMemo(() => {
    const line = (a: [number, number, number], b: [number, number, number], via?: [number, number, number]) =>
      new THREE.CatmullRomCurve3([V(a), ...(via ? [V(via)] : []), V(b)].map((v) => v.setY(0.05)));
    return {
      nurse: line(door("1hms"), door("1lab"), HUB),
      doctor: line(door("1rad"), door("1hms"), HUB),
      pharmacist: line(door("1pharma"), HUB),
      porter: line(door("1lab"), door("1pharma"), [1.3, 0, 1.9]),
      visitor: new THREE.CatmullRomCurve3([new THREE.Vector3(-3.2, 0.05, 2.7), new THREE.Vector3(-2.2, 0.05, 2.2), new THREE.Vector3(-1.2, 0.05, 2.75)]),
      visitor2: new THREE.CatmullRomCurve3([new THREE.Vector3(2.4, 0.05, -1.55), new THREE.Vector3(1.4, 0.05, -1.9), new THREE.Vector3(-1.2, 0.05, -1.75)]),
    };
  }, []);
  return (
    <group>
      <RingRoad />
      <Patient stage={stage} animate={animate} />
      <Walker path={paths.nurse} look={{ shirt: C.glass, skin: "#e4b08a", hair: "#3b2a22" }} speed={0.42} offset={0.1} />
      <Walker path={paths.doctor} look={{ shirt: "#1ea99b", coat: true, skin: "#b8784f" }} speed={0.36} offset={0.55} pause={2} />
      <Walker path={paths.pharmacist} look={{ shirt: C.green, skin: "#d4a07a", hair: "#4a3326" }} speed={0.3} offset={0.3} pause={2.4} />
      <Walker path={paths.porter} look={{ shirt: "#f0b454", skin: "#c58a5e" }} speed={0.4} offset={0.8} />
      <Walker path={paths.visitor} look={{ shirt: "#e07a9a", skin: "#d9a37a", hair: "#1f1a17" }} speed={0.28} offset={0.2} pause={1.8} />
      <Walker path={paths.visitor2} look={{ shirt: "#64748b", skin: "#c9875a" }} speed={0.3} offset={0.6} pause={1.5} />
      <Vehicle kind="car" offset={0.1} speed={0.045} />
      <Vehicle kind="ambulance" offset={0.62} speed={0.055} />
    </group>
  );
}
