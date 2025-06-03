// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get the target element
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        // Use a fixed offset for sticky header (120px for desktop, 140px for mobile)
        let offset = 120;
        if (window.innerWidth <= 768) offset = 140;
        
        // Calculate the scroll position
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        // Perform the scroll
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Update active state of navigation links
        updateActiveNavLink();
    });
});

// Form submission handling with floating labels
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Add placeholder attributes for floating label effect
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.setAttribute('placeholder', ' ');
    });

    // AJAX submit for Formspree
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formSuccess = document.getElementById('form-success');
        const formData = new FormData(this);
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                this.reset();
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
            } else {
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    formSuccess.textContent = 'Sorry, there was an error. Please try again.';
                    formSuccess.style.color = '#ff4d4f';
                }
            }
        } catch (error) {
            if (formSuccess) {
                formSuccess.style.display = 'block';
                formSuccess.textContent = 'Sorry, there was an error. Please try again.';
                formSuccess.style.color = '#ff4d4f';
            }
        }
    });
}

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;
const scrollThreshold = 100;

function updateHeaderOnScroll() {
    // Use white transparent background for light theme
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    // Hide/show header based on scroll direction (keep this logic)
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
}

window.addEventListener('scroll', updateHeaderOnScroll);

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const styles = getComputedStyle(document.documentElement);
    const baseScrollMargin = parseInt(styles.getPropertyValue('--scroll-margin') || '120');
    
    // Add additional margin for specific sections
    let extraMargin = 20; // Default extra margin for sections
    if (element.id === 'solutions') {
        extraMargin = 30; // Extra margin for solutions section
    }
    
    const scrollMargin = baseScrollMargin + extraMargin;
    
    return (
        rect.top >= -rect.height + scrollMargin &&
        rect.top <= window.innerHeight - scrollMargin &&
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        if (isInViewport(section)) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initial check for active navigation link
updateActiveNavLink();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--scroll-margin')} 0px -50px 0px`
};

// Animate elements when they come into view
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// About section text animation
document.querySelectorAll('.about p').forEach((p, index) => {
    p.style.transitionDelay = `${index * 0.2}s`;
    animateOnScroll.observe(p);
});

// Solution cards animation
document.querySelectorAll('.solution-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    animateOnScroll.observe(card);
});

// Animate sections
document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('hero')) {
        animateOnScroll.observe(section);
    }
});

// Hero section particles animation
function createParticle() {
    const shapes = document.querySelector('.animated-shapes');
    if (!shapes) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation duration
    particle.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;
    
    shapes.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Handle active state for navigation links based on scroll position
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset for better accuracy

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Set active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Set active link on page load
    setActiveLink();

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// iPhone Safari optimizations
(function() {
    // Prevent double-tap zoom on iPhone
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Handle iPhone viewport changes
    function handleViewportChange() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);
    handleViewportChange();

    // Improve scroll performance on iPhone
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
})(); 