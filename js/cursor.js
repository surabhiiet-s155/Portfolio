/**
 * Interactive Cursor Glow & Stardust Sparkle System (Executive Burnt Orange & Cream Theme)
 */

(function () {
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let targetCursorX = cursorX;
    let targetCursorY = cursorY;

    const cursorGlow = document.getElementById('cursor-glow');
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    const canvas = document.getElementById('cursor-trail-canvas');
    let ctx = null;
    const particles = [];
    const maxParticles = 70;

    if (canvas) {
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2.4 + 0.6;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed + 0.35;
            this.size = Math.random() * 3.8 + 1.4;
            this.alpha = 1.0;
            this.decay = Math.random() * 0.038 + 0.022;

            const colors = [
                '#c2410c', // Deep Burnt Orange
                '#ea580c', // Sunset Orange
                '#b45309', // Antique Gold
                '#d97706', // Warm Amber
                '#fb923c', // Peach
                '#be123c'  // Deep Rose
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
            this.size *= 0.95;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 9;
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0.5, this.size), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function addSparkles(x, y, count = 2) {
        if (!canvas || !ctx) return;
        for (let i = 0; i < count; i++) {
            if (particles.length < maxParticles) {
                particles.push(new Particle(x, y));
            }
        }
    }

    document.addEventListener('mousemove', (e) => {
        targetCursorX = e.clientX;
        targetCursorY = e.clientY;

        addSparkles(e.clientX, e.clientY, 2);

        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            targetCursorX = e.touches[0].clientX;
            targetCursorY = e.touches[0].clientY;
            addSparkles(targetCursorX, targetCursorY, 1);
            document.documentElement.style.setProperty('--mouse-x', `${targetCursorX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${targetCursorY}px`);
        }
    }, { passive: true });

    function updateCursor() {
        cursorX += (targetCursorX - cursorX) * 0.22;
        cursorY += (targetCursorY - cursorY) * 0.22;

        if (cursorGlow) {
            cursorGlow.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        }

        if (cursorDot) {
            cursorDot.style.transform = `translate3d(${targetCursorX}px, ${targetCursorY}px, 0)`;
        }

        if (cursorRing) {
            cursorRing.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        }

        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw(ctx);
                if (p.alpha <= 0 || p.size <= 0.4) {
                    particles.splice(i, 1);
                }
            }
        }

        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    function setupCardShine() {
        const shineCards = document.querySelectorAll('.shine-card, .project-card, .cert-card, .skill-card, .stat-card, .timeline-card, .exp-spotlight-card, .profile-large-frame-card, .nxtwave-spotlight-card, .recruiter-box');

        shineCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--card-x', `${x}px`);
                card.style.setProperty('--card-y', `${y}px`);

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5.5;
                const rotateY = ((x - centerX) / centerX) * 5.5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                card.style.setProperty('--card-x', `-1000px`);
                card.style.setProperty('--card-y', `-1000px`);
            });
        });
    }

    function setupInteractiveCursor() {
        const interactives = document.querySelectorAll('a, button, input, textarea, .tab-btn, .filter-tab, .cert-card, .whatsapp-quick-btn, .photo-upload-label, .recruiter-box');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                if (cursorRing) cursorRing.classList.add('cursor-hover');
                if (cursorDot) cursorDot.classList.add('cursor-dot-hover');
            });
            el.addEventListener('mouseleave', () => {
                if (cursorRing) cursorRing.classList.remove('cursor-hover');
                if (cursorDot) cursorDot.classList.remove('cursor-dot-hover');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupCardShine();
            setupInteractiveCursor();
        });
    } else {
        setupCardShine();
        setupInteractiveCursor();
    }

    window.refreshCardEffects = function () {
        setupCardShine();
        setupInteractiveCursor();
    };
})();
