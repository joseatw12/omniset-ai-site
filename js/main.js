// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling with floating labels
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Add placeholder attributes for floating label effect
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.setAttribute('placeholder', ' ');
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.style.backgroundColor = '#00b4d8';
        
        // Reset form and button after delay
        setTimeout(() => {
            this.reset();
            button.textContent = originalText;
            button.style.backgroundColor = '';
            
            // Reset floating labels
            this.querySelectorAll('input, textarea').forEach(field => {
                field.setAttribute('placeholder', ' ');
            });
        }, 3000);
    });
}

// Header scroll effect with progress indicator
const header = document.querySelector('.header');
let lastScroll = 0;
const scrollThreshold = 100;

function updateHeaderOnScroll() {
    const currentScroll = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Update header background opacity based on scroll
    const scrolled = Math.min(currentScroll / 500, 1);
    header.style.backgroundColor = `rgba(10, 25, 48, ${0.8 + scrolled * 0.2})`;
    
    // Hide/show header based on scroll direction
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', updateHeaderOnScroll);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
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

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
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

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Initial check 