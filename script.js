// --- Navbar Scroll Effect & Mobile Menu ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// --- Intersection Observer for Scroll Animations ---
const faders = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// --- Spotify Playlist Logic ---
const songs = [
    "https://open.spotify.com/embed/track/2GThBgzZoZfz0lx1JjBwfe?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/track/5XeFesFbtLpXzIVDNQP22n?utm_source=generator"
];
let currentSongIndex = 0;
const spotifyPlayer = document.getElementById('spotify-player');
const prevBtn = document.getElementById('prev-song');
const nextBtn = document.getElementById('next-song');

if (spotifyPlayer && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        spotifyPlayer.src = songs[currentSongIndex];
    });

    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        spotifyPlayer.src = songs[currentSongIndex];
    });
}

// --- Envelope Logic ---
const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('open-letter');
const closeBtn = document.getElementById('close-letter');

openBtn.addEventListener('click', () => {
    envelope.classList.remove('close');
    envelope.classList.add('open');
    openBtn.style.display = 'none';
    closeBtn.style.display = 'inline-block';
});

closeBtn.addEventListener('click', () => {
    envelope.classList.remove('open');
    envelope.classList.add('close');
    closeBtn.style.display = 'none';
    openBtn.style.display = 'inline-block';
});

// --- Star Particle Canvas ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class StarParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.1 + 0.05;
        this.speedX = (Math.random() - 0.5) * 0.05;
        this.opacity = Math.random() * 0.8 + 0.2;
    }
    
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        // Twinkle effect
        this.opacity += (Math.random() - 0.5) * 0.05;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 1) this.opacity = 1;
        
        if (this.y < -10) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
    }
    
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Subtle glow for larger stars
        if (this.size > 1.5) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = "white";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}

function initParticles() {
    particles = [];
    let numberOfParticles = Math.floor(window.innerWidth / 8); // Denser star field
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new StarParticle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// --- Custom Cursor Logic ---
const customCursor = document.getElementById('custom-cursor');
if (customCursor) {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        customCursor.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        customCursor.style.display = 'block';
    });
}

// --- Time Together Counter ---
// Set the date when you met or started dating (Year, Month (0-indexed), Day, Hour, Minute)
// The user specified: May 19th 1:13Am
// Note: Month is 0-indexed, so May is 4.
const startDate = new Date(2025, 4, 19, 1, 13).getTime(); 

function updateCounter() {
    const now = new Date().getTime();
    const difference = now - startDate;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if(document.getElementById('days')) {
            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        }
    }
}

setInterval(updateCounter, 1000);
updateCounter();

// --- Bucket List LocalStorage ---
const checkboxes = document.querySelectorAll('.bucket-list input[type="checkbox"]');

// Load saved states
checkboxes.forEach((checkbox) => {
    const savedState = localStorage.getItem(checkbox.id);
    if (savedState === 'true') {
        checkbox.checked = true;
    }

    // Save state on change
    checkbox.addEventListener('change', () => {
        localStorage.setItem(checkbox.id, checkbox.checked);
    });
});

// --- Lightbox Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVid = document.getElementById('lightbox-vid');
const closeLightbox = document.querySelector('.lightbox-close');
const galleryMedia = document.querySelectorAll('.gallery-item img, .gallery-item video');

if (lightbox && lightboxImg && lightboxVid && closeLightbox && galleryMedia) {
    galleryMedia.forEach(media => {
        media.style.cursor = 'none'; 
        media.addEventListener('click', () => {
            lightbox.style.display = 'block';
            if (media.tagName.toLowerCase() === 'img') {
                lightboxImg.src = media.src;
                lightboxImg.style.display = 'block';
                lightboxVid.style.display = 'none';
                lightboxVid.pause();
            } else if (media.tagName.toLowerCase() === 'video') {
                lightboxVid.src = media.src;
                lightboxVid.style.display = 'block';
                lightboxImg.style.display = 'none';
                lightboxVid.play();
            }
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxVid.pause();
    });

    // Close when clicking outside the media
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxVid.pause();
        }
    });
}

// --- Daily Love Generator ---
const loveReasons = [
    "You have the most beautiful smile.",
    "Your laugh is my favorite sound in the world.",
    "You always know how to make me feel better.",
    "You have a heart of gold.",
    "Your eyes hold the whole universe.",
    "You are incredibly smart and driven.",
    "I love the way you look at me.",
    "Every moment with you feels like magic.",
    "You are my safe space.",
    "I love your silly jokes.",
    "You make my world so much brighter.",
    "I love the way we understand each other.",
    "You inspire me to be a better person.",
    "My heart still skips a beat when I see you."
];

const generateBtn = document.getElementById('generate-btn');
const loveReasonText = document.getElementById('love-reason-text');

if (generateBtn && loveReasonText) {
    generateBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * loveReasons.length);
        
        // Add a small fade-out effect
        loveReasonText.style.opacity = 0;
        
        setTimeout(() => {
            loveReasonText.innerText = loveReasons[randomIndex];
            loveReasonText.style.opacity = 1;
            loveReasonText.style.transition = "opacity 0.5s ease";
        }, 300);
    });
}

// --- Love Coupons ---
const redeemBtns = document.querySelectorAll('.redeem-btn');

redeemBtns.forEach((btn) => {
    const couponCard = btn.closest('.coupon');
    
    btn.addEventListener('click', () => {
        couponCard.classList.add('redeemed');
    });
});

// --- Scratch-Off Logic ---
const scratchCanvas = document.getElementById('scratch-canvas');
if (scratchCanvas) {
    const sCtx = scratchCanvas.getContext('2d');
    let isDrawing = false;
    
    // Set canvas size to match container
    const setCanvasSize = () => {
        const rect = scratchCanvas.parentElement.getBoundingClientRect();
        // Fallback dimensions if rect is 0
        scratchCanvas.width = rect.width || 400;
        scratchCanvas.height = rect.height || 250;
        
        // Fill with a color/pattern initially
        sCtx.fillStyle = '#2a2a35'; // Slightly lighter than background
        sCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
        
        // Add some text over the scratch layer
        sCtx.fillStyle = '#ff4d6d';
        sCtx.font = '24px Playfair Display';
        sCtx.textAlign = 'center';
        sCtx.fillText('Scratch Here', scratchCanvas.width / 2, scratchCanvas.height / 2);
    };
    
    // Initialize after a small delay to ensure CSS is applied
    setTimeout(setCanvasSize, 100);

    const getMousePos = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX || (evt.touches && evt.touches[0].clientX)) - rect.left,
            y: (evt.clientY || (evt.touches && evt.touches[0].clientY)) - rect.top
        };
    };

    const scratch = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        
        const pos = getMousePos(scratchCanvas, e);
        
        sCtx.globalCompositeOperation = 'destination-out';
        sCtx.beginPath();
        sCtx.arc(pos.x, pos.y, 30, 0, Math.PI * 2, false);
        sCtx.fill();
    };

    scratchCanvas.addEventListener('mousedown', () => isDrawing = true);
    scratchCanvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => isDrawing = false);

    // Touch support
    scratchCanvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        scratch(e);
    });
    scratchCanvas.addEventListener('touchmove', scratch);
    window.addEventListener('touchend', () => isDrawing = false);
}

// --- Virtual Pet Logic ---
const petMessages = [
    "Woof! You look beautiful today!",
    "Bark! Yussan loves you so much!",
    "Pant pant... Can I have a cookie?",
    "*Happy tail wags*",
    "You're the best dog mom!",
    "Woof! Did someone say 'our movie'?",
    "Arf! You're his absolute favorite!",
    "I love you yarohy enty ❤️",
    "*Sniffs* Smells like true love!"
];

const virtualPet = document.getElementById('virtual-pet');
const petSpeech = document.getElementById('pet-speech');
const petMessageText = document.getElementById('pet-message');
let petTimeout;

if (virtualPet && petSpeech && petMessageText) {
    virtualPet.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * petMessages.length);
        petMessageText.innerText = petMessages[randomIndex];
        
        petSpeech.classList.add('show');
        
        clearTimeout(petTimeout);
        petTimeout = setTimeout(() => {
            petSpeech.classList.remove('show');
        }, 3500);
    });
}

// --- Night Light Toggle Logic ---
const nightLightToggle = document.getElementById('night-light-toggle');
if (nightLightToggle) {
    nightLightToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-light-active');
        const icon = nightLightToggle.querySelector('i');
        const isNight = document.body.classList.contains('night-light-active');
        
        if (isNight) {
            icon.className = 'fas fa-sun';
            nightLightToggle.innerHTML = '<i class="fas fa-sun"></i> Day Mode';
        } else {
            icon.className = 'fas fa-moon';
            nightLightToggle.innerHTML = '<i class="fas fa-moon"></i> Night Mode';
        }
    });
}

// --- Interactive Constellation Game ---
const cCanvas = document.getElementById('constellation-canvas');
const cSuccess = document.getElementById('constellation-success');
if (cCanvas) {
    const cCtx = cCanvas.getContext('2d');
    let points = [];
    let connections = [];
    let lastPoint = null;

    const heartPoints = [
        {x: 400, y: 150},
        {x: 300, y: 100},
        {x: 200, y: 150},
        {x: 200, y: 250},
        {x: 400, y: 350},
        {x: 600, y: 250},
        {x: 600, y: 150},
        {x: 500, y: 100}
    ];

    function initConstellation() {
        const rect = cCanvas.parentElement.getBoundingClientRect();
        cCanvas.width = rect.width || 800;
        cCanvas.height = 400;
        
        points = [];
        connections = [];
        lastPoint = null;
        cSuccess.style.display = 'none';

        const scaleX = cCanvas.width / 800;
        const scaleY = cCanvas.height / 400;

        heartPoints.forEach(p => {
            points.push({
                x: p.x * scaleX,
                y: p.y * scaleY,
                active: false,
                isHeart: true
            });
        });

        for (let i = 0; i < 15; i++) {
            points.push({
                x: Math.random() * cCanvas.width,
                y: Math.random() * cCanvas.height,
                active: false,
                isHeart: false
            });
        }
        drawConstellation();
    }

    function drawConstellation() {
        cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
        
        cCtx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
        cCtx.lineWidth = 2;
        cCtx.shadowBlur = 10;
        cCtx.shadowColor = "gold";
        
        connections.forEach(conn => {
            cCtx.beginPath();
            cCtx.moveTo(conn.p1.x, conn.p1.y);
            cCtx.lineTo(conn.p2.x, conn.p2.y);
            cCtx.stroke();
        });

        points.forEach(p => {
            cCtx.fillStyle = p.active ? '#ffd700' : (p.isHeart ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.3)');
            cCtx.shadowBlur = p.active ? 20 : (p.isHeart ? 10 : 0);
            cCtx.shadowColor = "gold";
            cCtx.beginPath();
            cCtx.arc(p.x, p.y, p.active ? 8 : (p.isHeart ? 6 : 4), 0, Math.PI * 2);
            cCtx.fill();
        });
        cCtx.shadowBlur = 0;
    }

    cCanvas.addEventListener('mousedown', (e) => {
        const rect = cCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        points.forEach(p => {
            const dist = Math.sqrt((p.x - mouseX)**2 + (p.y - mouseY)**2);
            if (dist < 40) {
                p.active = true;
                if (lastPoint && lastPoint !== p) {
                    connections.push({p1: lastPoint, p2: p});
                }
                lastPoint = p;
                checkWin();
            }
        });
        drawConstellation();
    });

    function checkWin() {
        const activeHeartPoints = points.filter(p => p.isHeart && p.active);
        if (activeHeartPoints.length === heartPoints.length) {
            setTimeout(() => {
                cSuccess.style.display = 'block';
            }, 500);
        }
    }

    window.resetConstellation = () => {
        initConstellation();
    };

    window.addEventListener('resize', initConstellation);
    setTimeout(initConstellation, 100);
}
