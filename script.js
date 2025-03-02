// Mobile menu functionality
const btn = document.querySelector(".mobile-menu-button");
const menu = document.querySelector(".mobile-menu");
const hamburgerLines = btn.querySelector(".flex");

const toggleMenu = () => {
    menu.classList.toggle("hidden");
    hamburgerLines.classList.toggle("hamburger-active");
    
    // Add slide animation
    if (!menu.classList.contains("hidden")) {
        menu.style.transform = "translateY(0)";
        menu.style.opacity = "1";
    } else {
        menu.style.transform = "translateY(-10px)";
        menu.style.opacity = "0";
    }
};

// Toggle menu on button click
btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add("hidden");
        hamburgerLines.classList.remove("hamburger-active");
    }
});

// Close menu when clicking a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add("hidden");
        hamburgerLines.classList.remove("hamburger-active");
    });
});

// Form submission handling
const form = document.querySelector('#contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';

    // Simulate sending (temporary)
    setTimeout(() => {
        alert('Message sent successfully!');
        form.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }, 1000);
});

// Tambahkan di bagian bawah script.js
AOS.init({
    duration: 1000,
    once: true
});

// Dark mode functionality
const darkModeToggle = document.getElementById('darkMode');
const darkModeToggleMobile = document.querySelector('.dark-mode-toggle-mobile');
const html = document.documentElement;

// Set dark mode as default if no preference is stored
if (!('darkMode' in localStorage)) {
    localStorage.setItem('darkMode', 'true');
    html.classList.add('dark');
}

// Function to toggle dark mode
const toggleDarkMode = () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
};

// Add click event listeners to both desktop and mobile toggles
darkModeToggle.addEventListener('click', toggleDarkMode);
darkModeToggleMobile.addEventListener('click', toggleDarkMode);

// Check initial dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    html.classList.add('dark');
}

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Animate progress bars on scroll
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', `${progress}%`);
    });
};

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skill-progress')) {
                animateProgressBars();
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Particles.js Configuration
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    },
    retina_detect: true
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';

    const formData = new FormData(e.target);

    try {
        const response = await fetch('/submit-contact', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert('Message sent successfully!');
            e.target.reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Failed to send message. Please try again later.');
        console.error('Error:', error);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }
}); 