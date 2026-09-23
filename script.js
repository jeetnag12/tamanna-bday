/* ==========================================================================
   HAPPY BIRTHDAY TAMANNA - EXACT FILENAMES MAPPING & MASONRY ENGINE
   ========================================================================== */

// Explicit array mapping EVERY SINGLE file currently inside tamanna/ folder
const tamannaMediaFiles = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "4.mp4",
    "5.jpg",
    "5.mp4",
    "6.jpg",
    "6.mp4",
    "7.jpg",
    "7.mp4",
    "8.jpg",
    "8.mp4",
    "9.jpg",
    "9.mp4",
    "10.jpg",
    "10.mp4",
    "11.jpg",
    "12.jpg",
    "12.mp4",
    "13.jpg",
    "13.mp4",
    "14.jpg",
    "14.mp4",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpg",
    "25.jpg",
    "26.jpg",
    "27.jpg",
    "28.jpg",
    "29.jpg",
    "30.jpg",
    "31.jpg",
    "32.jpg",
    "33.jpg",
    "34.jpg",
    "35.jpg",
    "36.jpg",
    "37.jpg",
    "38.jpg",
    "39.jpg",
    "40.jpg",
    "41.jpg",
    "42.jpg",
    "43.jpg",
    "44.jpg",
    "45.jpg",
    "46.jpg",
    "47.jpg",
    "48.jpg",
    "49.jpg",
    "50.jpg",
    "51.jpg",
    "52.jpg",
    "53.jpg",
    "54.jpg",
    "55.jpg",
    "56.jpg",
    "57.jpg",
    "58.jpg",
    "59.jpg",
    "60.jpg",
    "61.jpg",
    "62.jpg",
    "63.jpg",
    "64.jpg",
    "65.jpg",
    "66.jpg",
    "67.jpg",
    "68.jpg",
    "69.jpg",
    "70.jpg",
    "71.jpg",
    "72.jpg",
    "73.jpg",
    "74.jpg",
    "75.jpg",
    "76.jpg",
    "77.jpg",
    "78.jpg",
    "79.jpg",
    "80.jpg",
    "81.jpg",
    "82.jpg",
    "83.jpg",
    "84.jpg",
    "85.jpg",
    "86.jpg",
    "87.jpg",
    "88.jpg",
    "89.jpg",
    "90.jpg",
    "91.jpg",
    "92.jpg",
    "93.jpg",
    "94.jpg",
    "95.jpg",
    "96.jpg",
    "97.jpg",
    "98.jpg",
    "99.jpg",
    "100.jpg",
    "101.jpg",
    "102.jpg",
    "103.jpg",
    "104.jpg",
    "105.jpg",
    "106.jpg",
    "107.jpg",
    "108.jpg",
    "109.jpg",
    "110.jpg",
    "111.jpg",
    "112.jpg",
    "113.jpg",
    "114.jpg",
    "115.jpg",
    "116.jpg",
    "117.jpg",
    "2025-04-18_media~Snapchat-2104260153.zip.nomedia.mp4",
    "Snapchat-107411693.mp4",
    "Snapchat-1671797254.mp4",
    "VID-20251106-WA0093.mp4"
];

document.addEventListener('DOMContentLoaded', () => {
    
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    /* ----------------------------------------------------------------------
       1. HERO ENTRANCE ANIMATIONS (GSAP Timeline)
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

    /* ----------------------------------------------------------------------
       2. TOP SCROLL PROGRESS BAR
       ---------------------------------------------------------------------- */
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        document.getElementById('scroll-progress').style.width = `${progress}%`;
    });

    /* ----------------------------------------------------------------------
       3. DYNAMIC MASONRY GRID FOR EVERY SINGLE FILE IN tamanna/
       ---------------------------------------------------------------------- */
    const masonryGrid = document.getElementById('masonry-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const BATCH_SIZE = 28;
    let currentIndex = 0;

    // Filter out 1.jpg (used in Hero) from gallery grid to avoid duplication if desired, 
    // or include all files. We will render all remaining items.
    const galleryItems = tamannaMediaFiles.filter(file => file !== "1.jpg");

    function renderBatch() {
        if (!masonryGrid) return;

        const nextBatch = galleryItems.slice(currentIndex, currentIndex + BATCH_SIZE);

        nextBatch.forEach((filename, idx) => {
            const gridItem = document.createElement('div');
            const globalIdx = currentIndex + idx;
            const glowClass = globalIdx % 2 === 0 ? 'pink-glow' : 'blue-glow';
            
            gridItem.className = `grid-item ${glowClass} gsap-grid-item`;

            const isVideo = filename.toLowerCase().endsWith('.mp4') || 
                            filename.toLowerCase().endsWith('.mov') || 
                            filename.toLowerCase().endsWith('.webm');

            if (isVideo) {
                // Video Element with autoplay loop muted playsinline
                const video = document.createElement('video');
                video.src = `tamanna/${filename}`;
                video.className = 'grid-video media-element';
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.setAttribute('playsinline', '');
                video.preload = 'metadata';

                const badge = document.createElement('span');
                badge.className = 'media-type-badge';
                badge.textContent = '▶ VIDEO';

                gridItem.appendChild(video);
                gridItem.appendChild(badge);
            } else {
                // Photo Image Element
                const img = document.createElement('img');
                img.src = `tamanna/${filename}`;
                img.alt = `Tamanna Memory ${filename}`;
                img.className = 'grid-img media-element';
                img.loading = 'lazy';

                gridItem.appendChild(img);
            }

            masonryGrid.appendChild(gridItem);

            // GSAP ScrollTrigger Float-Up Animation
            gsap.fromTo(gridItem,
                { opacity: 0, y: 45, scale: 0.94 },
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

        if (currentIndex >= galleryItems.length && loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Initial render of first 2 batches for immediate richness
    renderBatch();
    renderBatch();

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            renderBatch();
            renderBatch();
            ScrollTrigger.refresh();
        });
    }

    // Footer Slide Up GSAP Animation
    gsap.fromTo('.gsap-slide-up',
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-section',
                start: 'top 80%'
            }
        }
    );

    /* ----------------------------------------------------------------------
       4. AMBIENT FLOATING BUBBLES CANVAS
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
            wishModal.classList.active = true;
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
