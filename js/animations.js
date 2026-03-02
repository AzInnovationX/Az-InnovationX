/**
 * Animations Logic (Parallax, Particles, Counters, Typewriter)
 */

// 1. Counter Animation
function animateCounter(element, target) {
    let count = 0;
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    const stepIncrement = target / steps;

    const timer = setInterval(() => {
        count += stepIncrement;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }

        let suffix = '';
        const originalText = element.getAttribute('data-original-text') || element.textContent;
        if (!element.hasAttribute('data-original-text')) {
            element.setAttribute('data-original-text', originalText);
        }

        if (originalText.includes('%')) suffix = '%';
        else if (originalText.includes('+')) suffix = '+';
        else if (originalText.includes('/')) suffix = '/7';

        element.textContent = (suffix === '+' ? '+' : '') + Math.floor(count) + (suffix === '+' ? '' : suffix);
    }, interval);
}

// 2. Typewriter Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 3. Particle System
let particlesArray = [];
const canvas = document.getElementById('particle-canvas');
let ctx;
const mouse = {
    x: null,
    y: null,
    radius: 150
};

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 5;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 5;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 5;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 5;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    if (!canvas) return;
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = 'rgba(0, 245, 255, 0.6)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectParticles() {
    if (!canvas) return;
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(0, 245, 255, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    if (!canvas) return;
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    // 4. Parallax and Mouse Effects
    const customCursor = document.getElementById('custom-cursor');
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        mouse.x = clientX;
        mouse.y = clientY;

        // Update custom cursor
        if (customCursor) {
            customCursor.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
        }

        // Update parallax elements
        const x = (clientX - window.innerWidth / 2) / window.innerWidth * -1;
        const y = (clientY - window.innerHeight / 2) / window.innerHeight * -1;
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax-speed');
            const xOffset = x * speed * 20;
            const yOffset = y * speed * 20;
            el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particles setup
    if (canvas) {
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            initParticles();
        });
    }

    // Hero Text Staggered Entry
    const heroTextContainers = document.querySelectorAll('.hero .text-reveal-container');
    window.addEventListener('load', () => {
        heroTextContainers.forEach((container, index) => {
            setTimeout(() => {
                container.classList.add('visible');
            }, 500 + (index * 250));
        });
    });
});
