/**
 * Main Site Logic (Initialization, Scroll, Observers)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Intersection Observer for Fade-in effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeInObserver.observe(el);
    });

    // 3. Header Styling on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 15, 30, 0.98)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'rgba(10, 15, 30, 0.95)';
            header.style.padding = '15px 0';
        }
    });

    // 4. Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 5. Service Cards Interactivity
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    const servicesSection = document.querySelector('#servicios');
    if (servicesSection) servicesObserver.observe(servicesSection);

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (y / rect.height) * -12;
            const rotateY = (x / rect.width) * 12;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 6. Stats Counter Observer (uses function from animations.js)
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && typeof animateCounter === 'function') {
                    const text = statNumber.textContent;
                    let target = parseInt(text);
                    if (text.includes('%')) target = 95;
                    else if (text.includes('+')) target = 50; // Default or data-target

                    const dataTarget = statNumber.getAttribute('data-target');
                    if (dataTarget) target = parseInt(dataTarget);

                    animateCounter(statNumber, target);
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stat-card, .stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    // 7. Bento Boxes Observer
    const nosotrosSection = document.querySelector('#nosotros');
    const bentoBoxes = document.querySelectorAll('.bento-box');
    const typewriterElement = document.querySelector('.typewriter-text');

    const nosotrosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bentoBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.classList.add('visible');
                    }, index * 150);
                });

                if (typewriterElement && typeof typeWriter === 'function') {
                    const text = typewriterElement.getAttribute('data-text') || typewriterElement.textContent;
                    if (!typewriterElement.hasAttribute('data-text')) {
                        typewriterElement.setAttribute('data-text', text);
                    }
                    typewriterElement.textContent = '';
                    setTimeout(() => typeWriter(typewriterElement, text), bentoBoxes.length * 150);
                }
                nosotrosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (nosotrosSection) nosotrosObserver.observe(nosotrosSection);

    // 8. Solicitudes Ambient Background
    const solicitudesSection = document.querySelector('#solicitudes');
    const ambientBg = document.querySelector('.solicitudes-ambient-bg');
    if (solicitudesSection && ambientBg) {
        solicitudesSection.addEventListener('mousemove', (e) => {
            const rect = solicitudesSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ambientBg.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            ambientBg.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });
    }
});
