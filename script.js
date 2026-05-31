/* ============================================================
   MOHAMMED SHAMEEL — PORTFOLIO INTERACTIVE LOGIC (script.js)
   State-of-the-art vanilla JS for premium aesthetics
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ── 1. DOM Elements ──
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const cursorGlow = document.getElementById('cursorGlow');
    const particleCanvas = document.getElementById('particleCanvas');

    // Safe touch device detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ── 2. Mobile Navigation Toggle ──
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking a nav link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Navbar Scroll Class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('navbar--scrolled');
        } else {
            navbar?.classList.remove('navbar--scrolled');
        }
    }, { passive: true });

    // ── 3. Smooth Trail Cursor Glow (Mouse only) ──
    if (cursorGlow && !isTouchDevice) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });

        const updateGlow = () => {
            // Smooth trailing interpolation
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;

            cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate3d(-50%, -50%, 0)`;
            requestAnimationFrame(updateGlow);
        };
        updateGlow();
    } else if (cursorGlow) {
        // Hide on touch screens
        cursorGlow.style.display = 'none';
    }

    // ── 4. Scroll Reveal Observer ──
    const revealElements = document.querySelectorAll('[data-animate]');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('reveal-visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            // Add base reveal class
            el.classList.add('reveal-base');
            revealObserver.observe(el);
        });
    }

    // ── 5. Stats Count Up Animation ──
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const countUpObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetEl = entry.target;
                    const finalVal = parseInt(targetEl.getAttribute('data-count'), 10) || 0;
                    const duration = 2000; // 2s duration
                    const startTime = performance.now();

                    const animateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Eased cubic progress
                        const eased = 1 - Math.pow(1 - progress, 3);
                        targetEl.textContent = Math.floor(eased * finalVal);

                        if (progress < 1) {
                            requestAnimationFrame(animateCount);
                        } else {
                            targetEl.textContent = finalVal;
                        }
                    };

                    requestAnimationFrame(animateCount);
                    observer.unobserve(targetEl);
                }
            });
        }, {
            root: null,
            threshold: 0.2
        });

        statNumbers.forEach(num => {
            countUpObserver.observe(num);
        });
    }

    // ── 6. Interactive Network Particle Canvas ──
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d', { alpha: true });
        let animId;
        let particles = [];

        const resizeCanvas = () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * particleCanvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.25;
                this.vy = (Math.random() - 0.5) * 0.25;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.phase = Math.random() * Math.PI * 2;
                this.phaseSpeed = Math.random() * 0.01 + 0.003;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.phase += this.phaseSpeed;

                // Wrap boundaries
                if (this.x < 0 || this.x > particleCanvas.width || this.y < 0 || this.y > particleCanvas.height) {
                    this.reset();
                }
            }
        }

        // Particle density based on screen size
        const particleCount = Math.min(30, Math.floor(window.innerWidth / 50));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const maxDist = 120;
        const maxDistSq = maxDist * maxDist;

        const animate = () => {
            if (document.hidden) {
                animId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

            // Draw connections
            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        const alpha = (1 - dist / maxDist) * 0.06;
                        ctx.globalAlpha = alpha;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                    }
                }
            }
            ctx.strokeStyle = 'rgb(139, 47, 192)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1.0;

            // Draw particles
            particles.forEach(p => {
                p.update();
                const opacity = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));
                ctx.globalAlpha = opacity;
                ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1.0;

            animId = requestAnimationFrame(animate);
        };
        animate();
    }
});
