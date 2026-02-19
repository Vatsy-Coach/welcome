// ====================
// Contact Form Handler with Spam Protection
// ====================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Spam protection: Max 2 submissions per browser session
const MAX_SUBMISSIONS = 2;
const SUBMISSION_KEY = 'contactFormSubmissions';

function checkSpamLimit() {
const submissions = JSON.parse(sessionStorage.getItem(SUBMISSION_KEY)) || 0;

if (submissions >= MAX_SUBMISSIONS) {
return false;
}
return true;
}

function incrementSubmissionCount() {
const submissions = JSON.parse(sessionStorage.getItem(SUBMISSION_KEY)) || 0;
sessionStorage.setItem(SUBMISSION_KEY, JSON.stringify(submissions + 1));
}

contactForm.addEventListener('submit', async (e) => {
e.preventDefault();

// Check spam limit
if (!checkSpamLimit()) {
formMessage.textContent = '✗ You have reached the maximum submissions for this session (2). Please try again later.';
formMessage.classList.add('error');
formMessage.classList.remove('success');

setTimeout(() => {
formMessage.textContent = '';
formMessage.classList.remove('error');
}, 5000);
return;
}

// Get form data
const formData = new FormData(contactForm);

// Show loading state
const submitButton = contactForm.querySelector('.submit-button');
const originalText = submitButton.textContent;
submitButton.textContent = 'Sending...';
submitButton.disabled = true;

try {
// Using Formspree service (free, no backend needed)
// First time you submit, you'll get an email to confirm
const response = await fetch('https://formspree.io/f/arnavjainaj17@gmail.com', {
method: 'POST',
body: formData,
headers: {
'Accept': 'application/json'
}
});

if (response.ok) {
// Increment submission count on successful send
incrementSubmissionCount();

formMessage.textContent = '✓ Message sent successfully! I'll get back to you soon.';
formMessage.classList.add('success');
formMessage.classList.remove('error');

// Reset form
contactForm.reset();

// Clear message after 5 seconds
setTimeout(() => {
formMessage.textContent = '';
formMessage.classList.remove('success');
}, 5000);
} else {
throw new Error('Failed to send message');
}
} catch (error) {
console.error('Error:', error);
formMessage.textContent = '✗ Error sending message. Please try again or email me directly.';
formMessage.classList.add('error');
formMessage.classList.remove('success');

// Clear message after 5 seconds
setTimeout(() => {
formMessage.textContent = '';
formMessage.classList.remove('error');
}, 5000);
} finally {
submitButton.textContent = originalText;
submitButton.disabled = false;
}
});

// ====================
// Smooth Scrolling
// ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
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

// ====================
// Active Navigation Link
// ====================

window.addEventListener('scroll', () => {
let current = '';

const sections = document.querySelectorAll('section');
sections.forEach(section => {
const sectionTop = section.offsetTop;
const sectionHeight = section.clientHeight;

if (scrollY >= sectionTop - 200) {
current = section.getAttribute('id');
}
});

document.querySelectorAll('.nav-menu a').forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === `#${current}`) {
link.classList.add('active');
}
});
});

// ====================
// Scroll Animation
// ====================

const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry, index) => {
if (entry.isIntersecting) {
// Get the type of element for different animations
const element = entry.target;
const isCard = element.classList.contains('highlight-card') ||
element.classList.contains('rating-card') ||
element.classList.contains('package-card');

if (isCard) {
// Stagger animation for cards
const delay = index % 4 * 100; // Stagger by 100ms per card
setTimeout(() => {
element.style.animation = 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards';
}, delay);
} else if (element.classList.contains('form-group')) {
// Form groups slide in from left
const delay = index % 5 * 80;
setTimeout(() => {
element.style.animation = 'slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
}, delay);
} else {
// Default fade in up
element.style.animation = 'fadeInUp 0.6s ease forwards';
}
}
});
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.highlight-card, .rating-card, .package-card, .form-group').forEach(el => {
el.style.opacity = '0';
observer.observe(el);
});

// Animate section headings
const headings = document.querySelectorAll('h2');
headings.forEach(heading => {
const headingObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.animation = 'slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
headingObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

heading.style.opacity = '0';
headingObserver.observe(heading);
});

// ====================
// CSS Animation
// ====================

const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
from {
opacity: 0;
transform: translateY(40px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

@keyframes slideInLeft {
from {
opacity: 0;
transform: translateX(-40px);
}
to {
opacity: 1;
transform: translateX(0);
}
}

@keyframes slideInRight {
from {
opacity: 0;
transform: translateX(40px);
}
to {
opacity: 1;
transform: translateX(0);
}
}

@keyframes scaleIn {
from {
opacity: 0;
transform: scale(0.95);
}
to {
opacity: 1;
transform: scale(1);
}
}

.nav-menu a.active {
color: var(--accent);
border-bottom: 3px solid var(--accent);
padding-bottom: 5px;
}
`;
document.head.appendChild(style);

console.log('✓ Career Coach website loaded successfully!');