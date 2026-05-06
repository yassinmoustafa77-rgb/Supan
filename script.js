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

// --- Heart Particle Canvas ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class HeartParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 15 + 5;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = `rgba(255, 77, 109, ${this.opacity})`; // Accent color
    }
    
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        if (this.y < -50) {
            this.y = canvas.height + 50;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Drawing a heart shape
        let topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        // top left curve
        ctx.bezierCurveTo(
            this.x, this.y, 
            this.x - this.size / 2, this.y, 
            this.x - this.size / 2, this.y + topCurveHeight
        );
        // bottom left curve
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + this.size
        );
        // bottom right curve
        ctx.bezierCurveTo(
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + topCurveHeight
        );
        // top right curve
        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y, 
            this.x, this.y, 
            this.x, this.y + topCurveHeight
        );
        
        ctx.closePath();
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    let numberOfParticles = Math.floor(window.innerWidth / 20); // Responsive amount
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new HeartParticle());
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
