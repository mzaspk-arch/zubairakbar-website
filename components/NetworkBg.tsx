'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated 3D "connecting dots" network for the hero and page banners.
 * - Points drift in 3D, gently sway, tilt with the mouse; light-blue pulses travel along the links.
 * - Pauses when off-screen or the tab is hidden; draws one still frame for reduced-motion users.
 */
export default function NetworkBg({
  density = 80,
  bias = 'right',
  speed = 1,
  pulses = 4,
}: {
  density?: number;
  bias?: 'right' | 'center';
  speed?: number;
  pulses?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const N = Math.max(20, Math.min(160, density));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const TH = 0.44;
    const BLUE = '143,180,227';
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    type P = { x: number; y: number; z: number; vx: number; vy: number; vz: number; ph: number };
    const pts: P[] = Array.from({ length: N }, () => {
      const x = bias === 'right' ? (Math.random() < 0.74 ? rnd(-0.05, 1) : rnd(-1, -0.15)) : rnd(-1, 1);
      return { x, y: rnd(-1, 1), z: rnd(-1, 1), vx: rnd(-1, 1) * 0.0011, vy: rnd(-1, 1) * 0.0011, vz: rnd(-1, 1) * 0.0011, ph: Math.random() * Math.PI * 2 };
    });
    const pulseState = Array.from({ length: pulses }, () => ({ a: Math.floor(Math.random() * N), b: -1, t: 0 }));
    const proj: { x: number; y: number; f: number; d: number }[] = new Array(N);

    let W = 0;
    let H = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let mx = 0, my = 0, tx = 0, ty = 0;
    let visible = true;
    let raf = 0;
    const t0 = performance.now();

    const neighbours = (i: number) => {
      const out: number[] = [];
      const p = pts[i];
      for (let j = 0; j < N; j++) {
        if (j === i) continue;
        const q = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y, dz = p.z - q.z;
        if (dx * dx + dy * dy + dz * dz < TH * TH) out.push(j);
      }
      return out;
    };

    const draw = (now: number) => {
      if (!W || !H) return;
      const t = (now - t0) * speed;
      ctx.clearRect(0, 0, W, H);
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      const ay = Math.sin(t * 0.00012) * 0.38 + mx * 0.55;
      const ax = Math.cos(t * 0.0001) * 0.18 + my * 0.35;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const sxS = W * 0.52, syS = H * 0.56;

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        if (!reduce) {
          p.x += p.vx * speed; p.y += p.vy * speed; p.z += p.vz * speed;
          if (p.x > 1 || p.x < -1) p.vx *= -1;
          if (p.y > 1 || p.y < -1) p.vy *= -1;
          if (p.z > 1 || p.z < -1) p.vz *= -1;
        }
        const x1 = p.x * cy - p.z * sy;
        const z1 = p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const f = 2.4 / (2.4 + z2);
        proj[i] = { x: W / 2 + x1 * sxS * f, y: H / 2 + y2 * syS * f, f, d: Math.max(0, Math.min(1, (1.2 - z2) / 2.4)) };
      }

      ctx.lineWidth = 0.9;
      for (let i = 0; i < N; i++) {
        const p = pts[i], a = proj[i];
        for (let j = i + 1; j < N; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y, dz = p.z - q.z;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 > TH * TH) continue;
          const b = proj[j];
          const alpha = (1 - Math.sqrt(d2) / TH) * 0.34 * (0.35 + 0.65 * Math.min(a.d, b.d));
          ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < N; i++) {
        const a = proj[i];
        const tw = reduce ? 1 : 0.85 + 0.15 * Math.sin(t * 0.002 + pts[i].ph);
        const r = (1.1 + 2.1 * a.d) * a.f;
        if (a.d > 0.6) {
          ctx.fillStyle = `rgba(255,255,255,${(0.07 * tw).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(a.x, a.y, r * 3, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = `rgba(255,255,255,${((0.28 + 0.5 * a.d) * tw).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(a.x, a.y, r, 0, Math.PI * 2); ctx.fill();
      }

      if (!reduce) {
        for (const pu of pulseState) {
          if (pu.b < 0 || pu.t >= 1) {
            if (pu.b >= 0) pu.a = pu.b;
            const nb = neighbours(pu.a);
            if (!nb.length) { pu.a = Math.floor(Math.random() * N); pu.b = -1; continue; }
            pu.b = nb[Math.floor(Math.random() * nb.length)];
            pu.t = 0;
          }
          pu.t += 0.012 * speed;
          const A = proj[pu.a], B = proj[pu.b];
          const px = A.x + (B.x - A.x) * pu.t, py = A.y + (B.y - A.y) * pu.t;
          const g = ctx.createRadialGradient(px, py, 0, px, py, 14);
          g.addColorStop(0, `rgba(${BLUE},0.55)`);
          g.addColorStop(1, `rgba(${BLUE},0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(px, py, 14, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(${BLUE},0.95)`;
          ctx.beginPath(); ctx.arc(px, py, 2.4, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = `rgba(${BLUE},0.35)`;
          ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(px, py); ctx.stroke();
        }
      }
    };

    const resize = () => {
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = Math.max(1, Math.round(W * dpr));
      cv.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(performance.now());
    };
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      if (!r.width || !r.height) return;
      tx = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
      ty = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const io = new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? true; });
    io.observe(cv);

    if (!reduce) {
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        draw(now);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [density, bias, speed, pulses]);

  return (
    <div className="network-layer" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
