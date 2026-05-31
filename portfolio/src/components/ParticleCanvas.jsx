import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animId;
    let particles = [];
    let frameCount = 0;

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Optimize: Only resize if width changed, or height changed significantly (ignores mobile address bar collapses)
      if (w !== lastWidth || Math.abs(h - lastHeight) > 100) {
        canvas.width = w;
        canvas.height = h;
        lastWidth = w;
        lastHeight = h;
      }
    }
    canvas.width = lastWidth;
    canvas.height = lastHeight;

    window.addEventListener('resize', resize, { passive: true });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.2 + 0.04;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.012 + 0.004;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.phase += this.speed;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
    }

    // Fewer particles — enough for visual, not overloading GPU
    const count = Math.min(16, Math.floor(window.innerWidth / 80));
    for (let i = 0; i < count; i++) particles.push(new Particle());

    const DIST_THRESHOLD_SQ = 14400; // 120px squared
    const DIST_THRESHOLD = 120;

    function animate() {
      // Skip rendering on hidden tabs to save CPU
      if (document.hidden) {
        animId = requestAnimationFrame(animate);
        return;
      }

      frameCount++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch all connection lines into ONE path — huge perf win
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < DIST_THRESHOLD_SQ) {
            const alpha = (1 - Math.sqrt(distSq) / DIST_THRESHOLD) * 0.05;
            ctx.globalAlpha = alpha;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.strokeStyle = 'rgb(82, 3, 128)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Draw & update particles
      ctx.fillStyle = 'rgba(139, 47, 192, 1)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        const a = p.opacity * (0.5 + 0.5 * Math.sin(p.phase));
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
