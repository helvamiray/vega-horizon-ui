import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Villa3DProps {
  highlightedKey: string | null;
}

/**
 * Procedural wireframe villa rendered with Three.js.
 * Each interior system is a named mesh — when its key matches
 * `highlightedKey`, it glows in neon amber.
 */
const Villa3D = ({ highlightedKey }: Villa3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const componentsRef = useRef<Map<string, THREE.Object3D>>(new Map());
  const highlightRef = useRef<string | null>(null);

  useEffect(() => {
    highlightRef.current = highlightedKey;
    // Update emissive on every component
    componentsRef.current.forEach((obj, key) => {
      obj.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          const mat = m as THREE.MeshStandardMaterial & { _baseColor?: THREE.Color };
          if (!mat || !("emissive" in mat)) return;
          if (key === highlightedKey) {
            mat.emissive = new THREE.Color(0xff9d00);
            mat.emissiveIntensity = 1.4;
            mat.color = new THREE.Color(0xff9d00);
          } else {
            mat.emissive = new THREE.Color(0x00f0ff);
            mat.emissiveIntensity = 0.25;
            mat.color = new THREE.Color(0x00f0ff);
          }
        });
      });
    });
  }, [highlightedKey]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(8, 6, 10);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x88ccff, 0.4));
    const dir = new THREE.DirectionalLight(0x00f0ff, 0.8);
    dir.position.set(5, 10, 7);
    scene.add(dir);
    const rim = new THREE.PointLight(0xff9d00, 0.6, 30);
    rim.position.set(-6, 4, -4);
    scene.add(rim);

    // Ground grid
    const grid = new THREE.GridHelper(30, 30, 0x00f0ff, 0x0a3a4a);
    (grid.material as THREE.Material).opacity = 0.35;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);

    // === Villa shell (wireframe) ===
    const villaGroup = new THREE.Group();

    const wireMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.75 });
    const wallGeom = new THREE.BoxGeometry(6, 3, 4);
    const walls = new THREE.LineSegments(new THREE.EdgesGeometry(wallGeom), wireMat);
    walls.position.y = 1.5;
    villaGroup.add(walls);

    // Second floor
    const floor2Geom = new THREE.BoxGeometry(6, 2.4, 4);
    const floor2 = new THREE.LineSegments(new THREE.EdgesGeometry(floor2Geom), wireMat);
    floor2.position.y = 4.2;
    villaGroup.add(floor2);

    // Pitched roof
    const roofGeom = new THREE.ConeGeometry(4.3, 1.8, 4);
    const roof = new THREE.LineSegments(new THREE.EdgesGeometry(roofGeom), wireMat);
    roof.position.y = 6.3;
    roof.rotation.y = Math.PI / 4;
    villaGroup.add(roof);

    // Subtle translucent walls for depth
    const ghostMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, transparent: true, opacity: 0.04, side: THREE.DoubleSide,
    });
    const ghost1 = new THREE.Mesh(wallGeom, ghostMat);
    ghost1.position.y = 1.5;
    villaGroup.add(ghost1);
    const ghost2 = new THREE.Mesh(floor2Geom, ghostMat);
    ghost2.position.y = 4.2;
    villaGroup.add(ghost2);

    // === Interior zone partitions (wireframe) ===
    // Living room (ground, left), Mechanical room (ground, right),
    // Bedrooms (upper floor), Rooftop deck above roof base.
    const zoneMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff, transparent: true, opacity: 0.45,
    });
    // Living room box (ground, left half)
    const livingGeom = new THREE.BoxGeometry(3.2, 2.8, 3.6);
    const living = new THREE.LineSegments(new THREE.EdgesGeometry(livingGeom), zoneMat);
    living.position.set(-1.4, 1.5, 0);
    villaGroup.add(living);
    // Mechanical room (ground, right)
    const mechGeom = new THREE.BoxGeometry(2.4, 2.8, 3.6);
    const mech = new THREE.LineSegments(new THREE.EdgesGeometry(mechGeom), zoneMat);
    mech.position.set(1.6, 1.5, 0);
    villaGroup.add(mech);
    // Bedrooms partition (upper floor)
    const bedGeom = new THREE.BoxGeometry(2.8, 2.2, 3.6);
    const bed1 = new THREE.LineSegments(new THREE.EdgesGeometry(bedGeom), zoneMat);
    bed1.position.set(-1.5, 4.2, 0);
    villaGroup.add(bed1);
    const bed2 = new THREE.LineSegments(new THREE.EdgesGeometry(bedGeom), zoneMat);
    bed2.position.set(1.5, 4.2, 0);
    villaGroup.add(bed2);
    // Floor slab between levels
    const slabGeom = new THREE.BoxGeometry(6, 0.08, 4);
    const slab = new THREE.LineSegments(new THREE.EdgesGeometry(slabGeom), zoneMat);
    slab.position.y = 3.0;
    villaGroup.add(slab);
    // Rooftop deck rail
    const deckGeom = new THREE.BoxGeometry(5.2, 0.5, 3.4);
    const deck = new THREE.LineSegments(new THREE.EdgesGeometry(deckGeom), zoneMat);
    deck.position.y = 5.55;
    villaGroup.add(deck);
    // Windows (front facade)
    const winMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
    [[-2, 1.4, 2.01], [0, 1.4, 2.01], [2, 1.4, 2.01], [-2, 4.1, 2.01], [0, 4.1, 2.01], [2, 4.1, 2.01]].forEach((p) => {
      const w = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1.0, 0.9, 0.02)), winMat
      );
      w.position.set(p[0], p[1], p[2]);
      villaGroup.add(w);
    });

    // === Interior components (highlightable) ===
    const makeComp = (
      key: string,
      geom: THREE.BufferGeometry,
      pos: [number, number, number]
    ) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.25,
        metalness: 0.6,
        roughness: 0.3,
        transparent: true,
        opacity: 0.92,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(...pos);
      mesh.name = key;
      villaGroup.add(mesh);
      componentsRef.current.set(key, mesh);
      return mesh;
    };

    // Heat pump (outside, left)
    makeComp("heatpump", new THREE.BoxGeometry(1.2, 1.2, 0.8), [-4.2, 0.6, 1.5]);

    // Boiler (interior, ground floor right)
    makeComp("boiler", new THREE.CylinderGeometry(0.35, 0.35, 1.2, 16), [2.2, 1.0, -1.2]);

    // Tank (next to boiler)
    makeComp("tank", new THREE.CylinderGeometry(0.45, 0.45, 1.6, 24), [1.0, 1.2, -1.2]);

    // Pump (small)
    makeComp("pump", new THREE.SphereGeometry(0.28, 16, 16), [1.6, 0.4, -0.2]);

    // Manifold (rectangular bar)
    makeComp("manifold", new THREE.BoxGeometry(1.6, 0.18, 0.25), [0, 0.3, -1.5]);

    // Underfloor grid (ground floor)
    const underGroup = new THREE.Group();
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.25,
      metalness: 0.4, roughness: 0.4,
    });
    for (let x = -2.5; x <= 2.5; x += 0.6) {
      const pipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 3.6, 8),
        pipeMat.clone()
      );
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(x, 0.05, 0);
      underGroup.add(pipe);
    }
    underGroup.name = "underfloor";
    villaGroup.add(underGroup);
    componentsRef.current.set("underfloor", underGroup);

    // Radiators (upper floor)
    const radGroup = new THREE.Group();
    const radPositions: [number, number, number][] = [
      [-2.4, 4.3, 1.85], [2.4, 4.3, 1.85], [0, 4.3, -1.85],
    ];
    radPositions.forEach((p) => {
      const r = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.7, 0.12),
        new THREE.MeshStandardMaterial({
          color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.25,
          metalness: 0.5, roughness: 0.3,
        })
      );
      r.position.set(...p);
      radGroup.add(r);
    });
    radGroup.name = "radiators";
    villaGroup.add(radGroup);
    componentsRef.current.set("radiators", radGroup);

    // AC indoor units (upper floor, ceiling cassettes)
    const acGroup = new THREE.Group();
    const acPositions: [number, number, number][] = [
      [-1.8, 5.1, 0], [1.8, 5.1, 0],
    ];
    acPositions.forEach((p) => {
      const ac = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.18, 0.8),
        new THREE.MeshStandardMaterial({
          color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.25,
          metalness: 0.5, roughness: 0.3,
        })
      );
      ac.position.set(...p);
      acGroup.add(ac);
    });
    acGroup.name = "ac-units";
    villaGroup.add(acGroup);
    componentsRef.current.set("ac-units", acGroup);

    scene.add(villaGroup);

    // === Mouse controls (rotate + zoom) ===
    let isDown = false;
    let prevX = 0, prevY = 0;
    let yaw = 0.4, pitch = 0.25;
    let radius = 14;

    const onDown = (e: PointerEvent) => {
      isDown = true; prevX = e.clientX; prevY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onUp = (e: PointerEvent) => {
      isDown = false;
      try { renderer.domElement.releasePointerCapture(e.pointerId); } catch {}
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX; prevY = e.clientY;
      yaw   -= dx * 0.005;
      pitch  = Math.max(-0.4, Math.min(1.2, pitch + dy * 0.005));
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      radius = Math.max(6, Math.min(28, radius + e.deltaY * 0.01));
    };

    const dom = renderer.domElement;
    dom.style.touchAction = "none";
    dom.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    dom.addEventListener("wheel", onWheel, { passive: false });

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    let raf = 0;
    let autoYaw = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      autoYaw += 0.0015;
      const effectiveYaw = isDown ? yaw : yaw + autoYaw;
      const x = Math.sin(effectiveYaw) * Math.cos(pitch) * radius;
      const z = Math.cos(effectiveYaw) * Math.cos(pitch) * radius;
      const y = Math.sin(pitch) * radius + 3;
      camera.position.set(x, y, z);
      camera.lookAt(0, 2.5, 0);

      // Pulse the highlighted component
      if (highlightRef.current) {
        const obj = componentsRef.current.get(highlightRef.current);
        if (obj) {
          const t = performance.now() * 0.004;
          const k = 1.0 + Math.sin(t) * 0.4;
          obj.traverse((c) => {
            const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
            if (m && "emissiveIntensity" in m) m.emissiveIntensity = 1.2 + k * 0.4;
          });
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      dom.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      dom.removeEventListener("wheel", onWheel);
      renderer.dispose();
      if (dom.parentNode) dom.parentNode.removeChild(dom);
      componentsRef.current.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] md:h-[600px] rounded-2xl overflow-hidden glass">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute top-4 left-4 font-display text-xs tracking-[0.3em] text-cyan/80 uppercase">
        ◉ Digital Twin · Live
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 font-display text-[10px] tracking-[0.25em] text-foreground/50 uppercase">
        Drag to rotate · Scroll to zoom
      </div>
      {highlightedKey && (
        <div className="pointer-events-none absolute bottom-4 left-4 font-display text-xs tracking-[0.25em] uppercase amber-text animate-fade-in">
          ▲ Highlighting: {highlightedKey}
        </div>
      )}
    </div>
  );
};

export default Villa3D;
