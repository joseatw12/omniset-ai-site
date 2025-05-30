// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get the target element
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        // Get computed styles to account for any CSS variables
        const styles = getComputedStyle(document.documentElement);
        const scrollMargin = parseInt(styles.getPropertyValue('--scroll-margin') || '100');
        
        // Calculate the scroll position
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - scrollMargin;

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
    
    // Update active navigation link
    updateActiveNavLink();
}

window.addEventListener('scroll', updateHeaderOnScroll);

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const styles = getComputedStyle(document.documentElement);
    const scrollMargin = parseInt(styles.getPropertyValue('--scroll-margin') || '100');
    
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