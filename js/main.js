// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Floating particles effect
const particlesContainer = document.getElementById('particles-container');
const particleCount = 30;

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random starting position
    const startX = Math.random() * 100;
    particle.style.left = `${startX}%`;
    particle.style.bottom = `-10px`;
    
    // Random animation duration (10-20s)
    const duration = Math.random() * 10 + 10;
    
    // Random horizontal movement (-5% to 5%)
    const xMovement = (Math.random() * 10 - 5);
    
    // Apply animation
    particle.style.animation = `float-up ${duration}s linear infinite`;
    particle.style.setProperty('--x-movement', `${xMovement}%`);
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
        createParticle(); // Create new particle
    }, duration * 1000);
}

// Create initial particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

// Download section particles
const downloadParticlesContainer = document.getElementById('download-particles-container');
const downloadParticleCount = 20;

function createDownloadParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 4-8px for download section
    const size = Math.random() * 4 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random starting position
    const startX = Math.random() * 100;
    particle.style.left = `${startX}%`;
    particle.style.bottom = `-10px`;
    
    // Faster animation duration (8-15s)
    const duration = Math.random() * 7 + 8;
    
    // Wider horizontal movement (-10% to 10%)
    const xMovement = (Math.random() * 20 - 10);
    
    // Apply animation
    particle.style.animation = `float-up ${duration}s linear infinite`;
    particle.style.setProperty('--x-movement', `${xMovement}%`);
    
    downloadParticlesContainer.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
        createDownloadParticle(); // Create new particle
    }, duration * 1000);
}

// Create initial download section particles
for (let i = 0; i < downloadParticleCount; i++) {
    createDownloadParticle();
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#fff';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Carousel functionality
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
const totalSlides = slides.length;

// Update active slides
function updateActiveSlides() {
    slides.forEach((slide, index) => {
        const isActive = Math.floor(index / 3) === Math.floor(currentSlide / 3);
        slide.classList.toggle('active', isActive);
    });
}

// Go to specific slide group
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const translateValue = (Math.floor(currentSlide / 3) * 33.333333);
    carousel.style.transform = `translateX(-${translateValue}%)`;
    updateActiveSlides();

    // Announce slide change for screen readers
    const groupIndex = Math.floor(currentSlide / 3) + 1;
    const totalGroups = Math.ceil(totalSlides / 3);
    const announcement = `Showing group ${groupIndex} of ${totalGroups}`;
    announceToScreenReader(announcement);
}

// Next slide group with improved animation
function nextSlide() {
    const nextGroup = Math.floor(currentSlide / 3) + 1;
    if (nextGroup * 3 >= totalSlides) {
        carousel.style.transition = 'none';
        currentSlide = 0;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            goToSlide(currentSlide);
        }, 10);
    } else {
        currentSlide = nextGroup * 3;
        goToSlide(currentSlide);
    }
}

// Previous slide group with improved animation
function prevSlide() {
    const prevGroup = Math.floor(currentSlide / 3) - 1;
    if (prevGroup < 0) {
        carousel.style.transition = 'none';
        currentSlide = Math.floor((totalSlides - 1) / 3) * 3;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            goToSlide(currentSlide);
        }, 10);
    } else {
        currentSlide = prevGroup * 3;
        goToSlide(currentSlide);
    }
}

// Event listeners
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto-advance every 5 seconds
let autoAdvance = setInterval(nextSlide, 5000);

// Pause auto-advance when user interacts with carousel
carousel.addEventListener('mouseenter', () => clearInterval(autoAdvance));
carousel.addEventListener('mouseleave', () => {
    autoAdvance = setInterval(nextSlide, 5000);
});

// Improved touch support with better gesture handling
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isSwiping = false;

// Helper function for screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
    carousel.style.transition = 'none';
}, { passive: true });

carousel.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = touchStartX - currentX;
    const deltaY = touchStartY - currentY;

    // If vertical scrolling is detected, stop handling the swipe
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isSwiping = false;
        return;
    }

    // Prevent default scrolling when swiping horizontally
    e.preventDefault();
}, { passive: false });

carousel.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = Math.abs(touchStartY - touchEndY);

    // Only process as swipe if horizontal movement is greater than vertical
    if (deltaY < Math.abs(deltaX)) {
        carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        if (deltaX > 50) {
            nextSlide();
        } else if (deltaX < -50) {
            prevSlide();
        }
    }
    
    isSwiping = false;
}, { passive: true });

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Share functionality
function shareGame() {
    const shareData = {
        title: 'TapTapGo - Fun Puzzle Adventure',
        text: 'Check out TapTapGo - A fun puzzle adventure with 5 exciting game modes! Test your reflexes, memory, and rhythm in this addictive game.',
        url: 'https://play.google.com/store/apps/details?id=com.untitledstudio.taptapgo'
    };

    if (navigator.share) {
        navigator.share(shareData)
            .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        const fallbackUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(fallbackUrl, '_blank');
    }
}