/* ==========================================================================
   HAPPY BIRTHDAY TAMANNA - JAVASCRIPT & GSAP MASONRY ENGINE
   ========================================================================== */

// 1. Array variable named galleryImages pre-filled from '1.jpg' to '125.jpg'
const galleryImages = Array.from({ length: 125 }, (_, i) => `${i + 1}.jpg`);

document.addEventListener('DOMContentLoaded', () => {
    
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    /* ----------------------------------------------------------------------
       2. DYNAMICALLY GENERATE MASONRY GRID (125 IMAGES)
       ---------------------------------------------------------------------- */
    const galleryGrid = document.getElementById('gallery-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const BATCH_SIZE = 24; // Load in smooth performant batches
    let currentIndex = 0;

    function renderImageBatch() {
        if (!galleryGrid) return;

        const nextBatch = galleryImages.slice(currentIndex, currentIndex + BATCH_SIZE);

        nextBatch.forEach((filename, idx) => {
            const gridItem = document.createElement('div');
            const globalIdx = currentIndex + idx;
            const glowClass = globalIdx % 2 === 0 ? 'pink-glow' : 'blue-glow';
            
            gridItem.className = `grid-item ${glowClass} gsap-grid-item`;

            // Image tag pointing to tamanna/ directory as specified
            const img = document.createElement('img');
            img.src = `tamanna/${filename}`;
            img.alt = `Tamanna Memory ${filename}`;
            img.className = 'grid-img';
            img.loading = 'lazy';

            // Graceful error handling for missing files
            img.onerror = function() {
                // If a user hasn't added all 125 photos yet, show an aesthetic placeholder
                this.onerror = null;
                this.src = `tamanna/IMG-20260919-WA0071.jpg`;
            };

            gridItem.appendChild(img);
            galleryGrid.appendChild(gridItem);

            // Animate grid item with GSAP ScrollTrigger
            gsap.fromTo(gridItem,
                { opacity: 0, y: 40, scale: 0.94 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: gridItem,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        currentIndex += nextBatch.length;

        if (currentIndex >= galleryImages.length && loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Initial render of first batch
    renderImageBatch();
    renderImageBatch(); // render first 48 images

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            renderImageBatch();
            renderImageBatch();
            ScrollTrigger.refresh();
        });
    }

    /* ----------------------------------------------------------------------
       3. AMBIENT FLOATING BUBBLES CANVAS
       ---------------------------------------------------------------------- */
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = [
        'rgba(255, 112, 166, 0.22)',
        'rgba(112, 214, 255, 0.22)',
        'rgba(255, 151, 193, 0.18)',
        'rgba(76, 201, 240, 0.18)'
    ];

    class Bubble {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.radius = Math.random() * 8 + 3;
            this.speedY = Math.random() * 0.4 + 0.2;
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.25;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;

            if (this.y < -20) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < 45; i++) {
        particles.push(new Bubble());
    }

    function animateBubbles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateBubbles);
    }

    animateBubbles();

    /* ----------------------------------------------------------------------
       4. HERO & CHAPTER GSAP ANIMATIONS
       ---------------------------------------------------------------------- */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

    heroTl.fromTo('.hero-badge', 
        { y: -30, opacity: 0 }, 
        { y: 0, opacity: 1 }
    )
    .fromTo('.title-sub', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        '-=0.9'
    )
    .fromTo('.title-main', 
        { y: 40, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.4 }, 
        '-=0.9'
    )
    .fromTo('.hero-cover-frame', 
        { y: 50, opacity: 0, scale: 0.96 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.4 }, 
        '-=0.9'
    )
    .fromTo('.scroll-indicator', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0 }, 
        '-=0.7'
    );

    // Scroll Progress Line
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        document.getElementById('scroll-progress').style.width = `${progress}%`;
    });

    // Chapter Slide Up GSAP ScrollTrigger Reveals
    const slideUpElements = document.querySelectorAll('.gsap-slide-up');

    slideUpElements.forEach((el) => {
        gsap.fromTo(el,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 82%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    /* ----------------------------------------------------------------------
       5. AMBIENT AUDIO SYNTHESIZER (Web Audio API)
       ---------------------------------------------------------------------- */
    const audioBtn = document.getElementById('audio-toggle');
    let audioCtx = null;
    let isPlayingAudio = false;
    let oscillators = [];
    let gainNode = null;

    function initAmbientSynth() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();

        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gainNode.connect(audioCtx.destination);

        const freqs = [174.61, 220.00, 261.63, 329.63, 440.00];

        freqs.forEach(freq => {
            const osc = audioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            osc.detune.setValueAtTime((Math.random() - 0.5) * 8, audioCtx.currentTime);

            osc.connect(gainNode);
            osc.start();
            oscillators.push(osc);
        });
    }

    audioBtn.addEventListener('click', () => {
        if (!audioCtx) {
            initAmbientSynth();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        isPlayingAudio = !isPlayingAudio;
        audioBtn.classList.toggle('playing', isPlayingAudio);

        if (isPlayingAudio) {
            gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 2);
        } else {
            gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
        }
    });

    /* ----------------------------------------------------------------------
       6. SKY BLUE & SOFT PINK CONFETTI FINALE
       ---------------------------------------------------------------------- */
    const celebrateBtn = document.getElementById('celebrate-btn');
    const wishModal = document.getElementById('wish-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalAckBtn = document.getElementById('modal-ack-btn');

    function triggerConfetti() {
        if (typeof confetti === 'function') {
            const count = 240;
            const defaults = {
                origin: { y: 0.7 },
                colors: ['#ff70a6', '#4cc9f0', '#ff97c1', '#70d6ff', '#ffffff', '#3a86ff', '#e64386']
            };

            function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            fire(0.25, { spread: 30, startVelocity: 60 });
            fire(0.2, { spread: 75 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 130, startVelocity: 50 });
        }
    }

    celebrateBtn.addEventListener('click', () => {
        triggerConfetti();
        
        setTimeout(() => {
            wishModal.classList.add('active');
            wishModal.setAttribute('aria-hidden', 'false');
        }, 400);
    });

    function closeModal() {
        wishModal.classList.remove('active');
        wishModal.setAttribute('aria-hidden', 'true');
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalAckBtn.addEventListener('click', () => {
        triggerConfetti();
        closeModal();
    });

    wishModal.addEventListener('click', (e) => {
        if (e.target === wishModal) {
            closeModal();
        }
    });
});
