"use client";

// The homepage hero world: the hospital campus with people and vehicles moving through it, and
// Vita flying overhead to wherever the current step is happening. The camera flies to a new
// angle for each step, so the visitor sees the same hospital from five perspectives.

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, useTexture } from "@react-three/drei";
import { BUILDINGS, CAMPUS_Y, CAMPUS_YAW, Campus, HOME, HUB, ROAD, type Stage } from "./HospitalScene";
import People from "./People";

/* ── Vita in three layers, flying ──────────────────────────────────────────────────── */
const IMG_W = 1200;
const IMG_H = 851;
const FAR = { x: 0.453, y: 0.53 };
const NEAR = { x: 0.652, y: 0.626 };

function layerGeometry(px: number, py: number, scale: number) {
  const g = new THREE.PlaneGeometry(IMG_W * scale, IMG_H * scale);
  g.translate(-(px - 0.5) * IMG_W * scale, (py - 0.5) * IMG_H * scale, 0);
  return g;
}

// Where Vita hovers for each step, in campus space.
const door = (k: string) => BUILDINGS.find((b) => b.key === k)!.door;
const HOVER: Record<Stage, THREE.Vector3> = {
  find: new THREE.Vector3(HOME[0] - 0.4, 1.45, HOME[2] + 0.3),
  book: new THREE.Vector3(HOME[0] - 0.9, 1.55, HOME[2] - 0.2),
  go: new THREE.Vector3(...ROAD.getPointAt(0.55).toArray()).add(new THREE.Vector3(0, 1.4, 0.3)),
  hms: new THREE.Vector3(door("1hms")[0] + 0.6, 2.75, door("1hms")[2] + 0.6),
  rad: new THREE.Vector3(door("1rad")[0] - 0.2, 1.85, door("1rad")[2] + 0.5),
};

function Vita({ stage, animate, width = 1.5 }: { stage: Stage; animate: boolean; width?: number }) {
  const scale = width / IMG_W;
  const [far, body, near] = useTexture(["/assets/vita/fly-wing-far.webp", "/assets/vita/fly-body.webp", "/assets/vita/fly-wing-near.webp"]);
  [far, body, near].forEach((t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; });
  const rig = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const farRef = useRef<THREE.Mesh>(null);
  const nearRef = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => ({ far: layerGeometry(FAR.x, FAR.y, scale), body: layerGeometry(0.5, 0.5, scale), near: layerGeometry(NEAR.x, NEAR.y, scale) }), [scale]);
  const pos = useRef(HOVER.find.clone());
  const vel = useRef(new THREE.Vector3());
  const mat = (map: THREE.Texture) => <meshBasicMaterial map={map} transparent alphaTest={0.04} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />;

  useFrame(({ clock, camera }, dt) => {
    const r = rig.current;
    if (!r) return;
    const t = clock.elapsedTime;
    // Fly toward the step's spot with a little lag, so she banks into the turn.
    const target = HOVER[stage];
    const prev = pos.current.clone();
    pos.current.x = THREE.MathUtils.damp(pos.current.x, target.x, 1.6, dt);
    pos.current.y = THREE.MathUtils.damp(pos.current.y, target.y + Math.sin(t * 0.9) * 0.08, 1.6, dt);
    pos.current.z = THREE.MathUtils.damp(pos.current.z, target.z, 1.6, dt);
    vel.current.copy(pos.current).sub(prev).divideScalar(Math.max(dt, 1e-3));
    r.position.copy(pos.current);
    const speed = vel.current.length();
    // Face the camera side-on (billboard around Y), lean into motion.
    const camDir = new THREE.Vector3().subVectors(camera.position, r.getWorldPosition(new THREE.Vector3()));
    const yaw = Math.atan2(camDir.x, camDir.z);
    r.rotation.y = THREE.MathUtils.damp(r.rotation.y, yaw - CAMPUS_YAW, 4, dt);
    if (inner.current) {
      inner.current.rotation.z = THREE.MathUtils.damp(inner.current.rotation.z, THREE.MathUtils.clamp(-vel.current.x * 0.25, -0.35, 0.35), 3, dt);
      inner.current.rotation.x = THREE.MathUtils.damp(inner.current.rotation.x, THREE.MathUtils.clamp(speed * 0.12, 0, 0.3), 3, dt);
    }
    // Faster, stronger beats while travelling; slow hover when she has arrived.
    const rate = 2.4 + Math.min(speed, 1.5) * 2.2;
    const amp = animate ? 0.22 + Math.min(speed, 1.5) * 0.12 : 0;
    const beat = Math.sin(t * rate);
    if (farRef.current) { farRef.current.rotation.z = 0.12 + beat * amp; farRef.current.rotation.x = -0.1 + beat * 0.08; }
    if (nearRef.current) { nearRef.current.rotation.z = -0.08 - beat * amp * 1.15; nearRef.current.rotation.x = 0.1 - beat * 0.1; }
    if (inner.current) inner.current.position.y = Math.sin(t * rate + 1.2) * 0.03;
    if (shadow.current) { shadow.current.position.y = -pos.current.y + 0.012; const k = 1.2 - pos.current.y * 0.18; shadow.current.scale.setScalar(Math.max(0.5, k)); }
  });

  return (
    <group ref={rig}>
      <group ref={inner} scale={[-1, 1, 1]}>
        <mesh ref={farRef} geometry={geo.far} position={[(FAR.x - 0.5) * IMG_W * scale, -(FAR.y - 0.5) * IMG_H * scale, -0.07]}>{mat(far)}</mesh>
        <mesh geometry={geo.body}>{mat(body)}</mesh>
        <mesh ref={nearRef} geometry={geo.near} position={[(NEAR.x - 0.5) * IMG_W * scale, -(NEAR.y - 0.5) * IMG_H * scale, 0.08]}>{mat(near)}</mesh>
      </group>
      {/* her shadow on the ground, so the height reads */}
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 24]} />
        <meshBasicMaterial color="#0e2343" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

/* ── Camera: a fresh angle for every step ───────────────────────────────────────────── */
// Positions in world space; targets in campus space (converted below).
const yawM = new THREE.Matrix4().makeRotationY(CAMPUS_YAW);
const toWorld = (p: THREE.Vector3 | [number, number, number]) => (p instanceof THREE.Vector3 ? p.clone() : new THREE.Vector3(...p)).applyMatrix4(yawM).add(new THREE.Vector3(0, CAMPUS_Y, 0));

const SHOTS: Record<Stage, { pos: [number, number, number]; look: THREE.Vector3; fov: number }> = {
  find: { pos: [6.6, 3.0, 7.2], look: toWorld([HOME[0] - 1.2, 0.5, HOME[2] - 0.6]), fov: 30 },
  book: { pos: [5.4, 4.0, 7.9], look: toWorld([HOME[0] - 1.8, 0.4, HOME[2] - 1.0]), fov: 31 },
  go: { pos: [7.6, 4.3, 6.2], look: toWorld([1.5, 0.4, 1.5]), fov: 32 },
  hms: { pos: [4.6, 5.4, 8.6], look: toWorld([0.2, 1.0, 0.5]), fov: 33 },
  rad: { pos: [-2.6, 4.3, 9.0], look: toWorld([door("1rad")[0] + 0.3, 0.7, door("1rad")[2] - 0.1]), fov: 31 },
};

function Director({ stage, pointer }: { stage: Stage; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera, size } = useThree();
  const want = useMemo(() => new THREE.Vector3(), []);
  const look = useRef(SHOTS.find.look.clone());
  useFrame((_, dt) => {
    const s = SHOTS[stage];
    const aspect = size.width / Math.max(1, size.height);
    // Narrow screens pull the camera back so the whole scene still fits.
    const back = aspect < 1.05 ? 1.5 : aspect < 1.2 ? 1.22 : 1.05;
    want.set(s.pos[0] * back + pointer.current.x * 0.6, s.pos[1] * back + pointer.current.y * 0.4, s.pos[2] * back);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, want.x, 1.8, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, want.y, 1.8, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, want.z, 1.8, dt);
    look.current.x = THREE.MathUtils.damp(look.current.x, s.look.x, 2.2, dt);
    look.current.y = THREE.MathUtils.damp(look.current.y, s.look.y, 2.2, dt);
    look.current.z = THREE.MathUtils.damp(look.current.z, s.look.z, 2.2, dt);
    camera.lookAt(look.current);
    const cam = camera as THREE.PerspectiveCamera;
    const fov = THREE.MathUtils.damp(cam.fov, s.fov, 2, dt);
    if (Math.abs(fov - cam.fov) > 0.01) { cam.fov = fov; cam.updateProjectionMatrix(); }
  });
  return null;
}

export default function WorldScene({ stage, onPick }: { stage: Stage; onPick: (s: Stage) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

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
  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        frameloop={animate ? "always" : "demand"}
        camera={{ position: [6.6, 3.0, 7.2], fov: 30, near: 0.1, far: 100 }}
        flat
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Director stage={stage} pointer={pointer} />
        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#ffffff", "#cfe4e1", 0.85]} />
        <directionalLight
          position={[5, 9, 4]}
          intensity={2.3}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={7}
          shadow-camera-bottom={-7}
          shadow-bias={-0.0004}
        />
        <Campus stage={stage} onPick={onPick} animate={animate} fixed people>
          <People stage={stage} animate={animate} />
          <Vita stage={stage} animate={animate} />
        </Campus>
        <ContactShadows position={[0, CAMPUS_Y - 0.16, 0.4]} opacity={0.35} scale={14} blur={2.6} far={3} frames={1} />
      </Canvas>
    </div>
  );
}
