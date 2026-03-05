// ===== Theme Toggle (Dark/Light Mode) =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    themeToggle.innerHTML = isLightMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

// ===== Scroll Progress Bar =====
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Smooth Scrolling & Active Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
        }
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Animated Counter for Stats =====
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 30);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

animateCounter();

// ===== Resume Download =====
document.getElementById('resumeBtn').addEventListener('click', () => {
    // Download resume PDF
    window.location.href = 'resume.pdf';
});

// ===== Certificate Modal Functionality =====
const certCards = document.querySelectorAll('.cert-card');
const certModals = document.querySelectorAll('.cert-modal');
const certCloses = document.querySelectorAll('.cert-close');

certCards.forEach(card => {
    card.addEventListener('click', () => {
        const certNum = card.getAttribute('data-cert');
        const modal = document.getElementById('certModal' + certNum);
        if (modal) {
            modal.classList.add('show');
        }
    });
});

certCards.forEach(card => {
    const btn = card.querySelector('.cert-preview-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certNum = card.getAttribute('data-cert');
            const modal = document.getElementById('certModal' + certNum);
            if (modal) {
                modal.classList.add('show');
            }
        });
    }
});

certCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        const modal = e.target.closest('.cert-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    });
});

certModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// ===== Project Case Study (Simple Modal) =====
const projectDetailsBtns = document.querySelectorAll('.project-details-btn');

projectDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectNum = btn.getAttribute('data-project');
        const projectCards = [
            {
                title: 'IdentityFlow Validator',
                description: 'High-performance C# automation engine for analyzing authentication workflows.',
                technologies: ['C#', 'HtmlAgilityPack', 'Design Patterns', 'Async Programming'],
                challenges: 'Complex state management and performance optimization',
                solution: 'Implemented heuristic algorithms and parallel processing',
                impact: 'Successfully validated 1000+ authentication workflows'
            },
            {
                title: 'Customer-Asset-Management-System',
                description: 'Enterprise-grade REST API with clean architecture.',
                technologies: ['ASP.NET Core', 'Entity Framework', 'SQL Server', 'Repository Pattern'],
                challenges: 'Building scalable API with proper separation of concerns',
                solution: 'Implemented layered architecture with repository and service patterns',
                impact: 'Increased data processing efficiency by 40%'
            },
            {
                title: 'Multithreading Excel Sheet Program',
                description: 'High-performance data processing tool for Excel automation.',
                technologies: ['C#', 'EPPlus', 'Multithreading', 'ClosedXML'],
                challenges: 'Processing large datasets efficiently',
                solution: 'Utilized multithreading and optimized memory usage',
                impact: 'Reduced data processing time from 30min to 5min'
            },
            {
                title: 'Learning Journey',
                description: 'Comprehensive collection of programming exercises and projects.',
                technologies: ['Multiple Languages', 'Data Structures', 'Algorithms'],
                challenges: 'Mastering fundamental CS concepts',
                solution: 'Consistent practice and implementation of standard solutions',
                impact: 'Strong foundation in problem-solving and coding'
            }
        ];

        if (projectCards[projectNum - 1]) {
            const project = projectCards[projectNum - 1];
            const message = `
PROJECT: ${project.title}
${project.description}

TECHNOLOGIES: ${project.technologies.join(', ')}

CHALLENGES: ${project.challenges}
SOLUTION: ${project.solution}
IMPACT: ${project.impact}
            `;
            alert(message);
        }
    });
});

// ===== Contact Form with Validation & Email =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validation
    if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please fill all fields';
        formStatus.classList.add('error');
        return;
    }
    
    if (!validateEmail(email)) {
        formStatus.textContent = 'Please enter a valid email';
        formStatus.classList.add('error');
        return;
    }
    
    formStatus.classList.remove('error');
    formStatus.textContent = 'Sending...';
    
    try {
        // Using Formspree for email (you need to replace YOUR_FORM_ID)
        // For now, simulate email sending
        await simulateEmailSend({ name, email, subject, message });
        
        formStatus.classList.add('success');
        formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        contactForm.reset();
        
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.classList.remove('success');
        }, 5000);
    } catch (error) {
        formStatus.classList.add('error');
        formStatus.textContent = 'Error sending message. Please try again.';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function simulateEmailSend(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Email would be sent:', data);
            // In production, this would call an API endpoint
            resolve();
        }, 1000);
    });
}

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .cert-card, .stat, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Navbar Dynamic Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(0, 240, 255, 0.3)';
    } else {
        navbar.style.borderBottomColor = 'rgba(0, 240, 255, 0.2)';
    }
});

// ===== GitHub Profile Stats (Optional - Replace with actual API if needed) =====
// This could be extended to fetch actual GitHub data using GitHub API

console.log('✓ Portfolio initialized successfully!');
