// ====================
// Contact Form Handler
// ====================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// ⚠️  IMPORTANT: Replace with your real Web3Forms key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = '66818d8b-131e-41b4-b763-80a2a7dcbf3b';

function showSuccessScreen() {
  const formContainer = contactForm.parentElement;

  formContainer.innerHTML = `
    <div id="successScreen" style="
      text-align: center;
      padding: 60px 40px;
      background: linear-gradient(135deg, #ffffff 0%, #fdf9f5 100%);
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(139, 115, 85, 0.1);
      border: 1px solid rgba(139, 115, 85, 0.1);
      max-width: 600px;
      margin: 0 auto;
      animation: fadeInUp 0.6s ease forwards;
    ">
      <div style="font-size: 72px; margin-bottom: 20px;">✅</div>
      <h3 style="
        font-size: 28px;
        color: #8b7355;
        margin-bottom: 15px;
        font-weight: 700;
        letter-spacing: -0.5px;
      ">Message Sent!</h3>
      <p style="
        color: #666;
        font-size: 16px;
        line-height: 1.7;
        margin-bottom: 35px;
        max-width: 380px;
        margin-left: auto;
        margin-right: auto;
      ">Thank you for reaching out. I'll get back to you as soon as possible!</p>
      <button id="goHomeBtn" style="
        padding: 14px 45px;
        background: #8b7355;
        color: white;
        border: none;
        border-radius: 50px;
        font-weight: 700;
        font-size: 15px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(139, 115, 85, 0.25);
        transition: all 0.3s ease;
      ">← Back to Home</button>
    </div>
  `;

  document.getElementById('goHomeBtn').addEventListener('click', () => {
    location.reload();
  });
}

function attachFormListener() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const submitButton = this.querySelector('.submit-button');
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  try {
    const formData = new FormData(this);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    console.log('API Response:', result);

    if (result.success) {
      showSuccessScreen();
      return;
    } else {
      const errorMsg = result.message || 'Submission failed. Check the console for details.';
      throw new Error(errorMsg);
    }
  } catch (err) {
    console.error('Form submission error:', err);
    console.error('Error details:', err.message);
    
    const msg = document.getElementById('formMessage');
    if (msg) {
      msg.textContent = '✗ ' + (err.message || 'Something went wrong. Check browser console for details.');
      msg.classList.add('error');
      msg.classList.remove('success');
    }

    submitButton.textContent = 'Send Message';
    submitButton.disabled = false;

    setTimeout(() => {
      const msg = document.getElementById('formMessage');
      if (msg) {
        msg.textContent = '';
        msg.classList.remove('success', 'error');
      }
    }, 6000);
  }
}

// Attach on initial page load
attachFormListener();

// ====================
// Smooth Scrolling
// ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      const element = entry.target;
      const isCard = element.classList.contains('highlight-card') ||
                     element.classList.contains('rating-card') ||
                     element.classList.contains('package-card');

      if (isCard) {
        const delay = index % 4 * 100;
        setTimeout(() => {
          element.style.animation = 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }, delay);
      } else if (element.classList.contains('form-group')) {
        const delay = index % 5 * 80;
        setTimeout(() => {
          element.style.animation = 'slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }, delay);
      } else {
        element.style.animation = 'fadeInUp 0.6s ease forwards';
      }
    }
  });
}, observerOptions);

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

console.log('✓ Career Coach website loaded successfully!');
