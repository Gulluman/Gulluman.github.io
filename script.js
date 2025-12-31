// ===== Theme Toggle =====
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Update navbar background for new theme
    setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = newTheme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(10, 10, 26, 0.98)';
        } else {
            navbar.style.background = newTheme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 10, 26, 0.9)';
        }
    }, 0);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Toggle icon between bars and X
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

function updateNavbarBackground() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (window.scrollY > 50) {
        navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(10, 10, 26, 0.98)';
    } else {
        navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 10, 26, 0.9)';
    }
}

window.addEventListener('scroll', updateNavbarBackground);

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--color-accent)';
            } else {
                navLink.style.color = '';
            }
        }
    });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
const sectionTitles = document.querySelectorAll('.section-title');
const aboutText = document.querySelector('.about-text');

// Add reveal class to elements
revealElements.forEach(element => {
    element.classList.add('reveal');
});

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    // Reveal cards and items
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });

    // Reveal section titles
    sectionTitles.forEach(title => {
        const titleTop = title.getBoundingClientRect().top;

        if (titleTop < windowHeight - revealPoint) {
            title.classList.add('active');
        }
    });

    // Reveal about text
    if (aboutText) {
        const aboutTop = aboutText.getBoundingClientRect().top;
        if (aboutTop < windowHeight - revealPoint) {
            aboutText.style.opacity = '1';
            aboutText.style.transform = 'translateY(0)';
        }
    }
};

// Set initial state for about text
if (aboutText) {
    aboutText.style.opacity = '0';
    aboutText.style.transform = 'translateY(30px)';
    aboutText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
