/* ============================================================
   PORTFOLIO - Mohamed Mahmoud | Cybersecurity Engineer
   File: script.js
   ============================================================
   
   TABLE OF CONTENTS:
   1.  Navbar Scroll Effect
   2.  Mobile Navigation Toggle
   3.  Smooth Scroll (Nav Links)
   4.  Scroll Reveal Animation
   5.  Typing Effect (Hero Title)
   6.  Terminal Typing Effect
   7.  Active Nav Link on Scroll
   8.  Contact Form Handler
   9.  Canvas Particle Background
   10. Init (Run Everything)
   ============================================================ */


/* ============================================================
   1. NAVBAR SCROLL EFFECT
   تغيير شكل الـ navbar عند الـ scroll
   ============================================================ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    // لو scroll أكتر من 50px يضيف class "scrolled"
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}


/* ============================================================
   2. MOBILE NAVIGATION TOGGLE
   فتح وإغلاق القائمة في الموبايل
   ============================================================ */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // إغلاق القائمة عند النقر على أي link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}


/* ============================================================
   3. SMOOTH SCROLL
   تمرير ناعم عند النقر على روابط الـ navbar
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      // offset لأن الـ navbar fixed
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });
}


/* ============================================================
   4. SCROLL REVEAL ANIMATION
   ظهور العناصر عند الـ scroll
   ============================================================ */
function initScrollReveal() {
  // نضيف class "reveal" لكل العناصر اللي عايزينها تظهر
  const elements = document.querySelectorAll(
    '.skill-card, .timeline-item, .project-card, .course-item, .contact-link, .info-item'
  );

  elements.forEach(el => el.classList.add('reveal'));

  // IntersectionObserver بيراقب متى العنصر يظهر في الشاشة
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // تأخير بسيط لكل عنصر عشان يظهروا بالترتيب
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);  // نوقف المراقبة بعد الظهور
      }
    });
  }, {
    threshold: 0.1,    // يظهر لما 10% من العنصر يبان
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


/* ============================================================
   5. TYPING EFFECT (HERO)
   تأثير الكتابة التدريجية
   ============================================================ */
function initTypingEffect() {
  const el = document.getElementById('typed-title');
  if (!el) return;

  // ======================================================
  // لتعديل النصوص اللي بتتكتب غيّر الـ array ده
  // ======================================================
  const texts = [
    'SOC Analyst',
    'Penetration Tester',
    'Incident Responder',
    'Cybersecurity Engineer'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentText = texts[textIndex];

    if (isPaused) {
      setTimeout(type, 1500);
      isPaused = false;
      return;
    }

    if (!isDeleting) {
      // كتابة
      el.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        // وصلنا لآخر الكلمة، نوقف شوية
        isPaused = true;
        isDeleting = true;
        setTimeout(type, 100);
        return;
      }
    } else {
      // مسح
      el.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(type, speed);
  }

  type();
}


/* ============================================================
   6. TERMINAL TYPING EFFECT
   تأثير الكتابة في الـ terminal
   ============================================================ */
function initTerminalEffect() {
  const terminal = document.querySelector('.terminal-body');
  if (!terminal) return;

  const lines = terminal.querySelectorAll('.t-line');

  lines.forEach((line, i) => {
    line.style.opacity = '0';
    // كل سطر يظهر بتأخير تدريجي
    setTimeout(() => {
      line.style.transition = 'opacity 0.3s ease';
      line.style.opacity = '1';
    }, 800 + i * 200);
  });
}

// تشغيل الـ terminal effect لما القسم يظهر
function initTerminalOnVisible() {
  const terminal = document.querySelector('.terminal-block');
  if (!terminal) return;

  let triggered = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      initTerminalEffect();
    }
  }, { threshold: 0.3 });

  observer.observe(terminal);
}


/* ============================================================
   7. ACTIVE NAV LINK ON SCROLL
   تحديد الـ section الحالية في الـ navbar
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--accent)';
      }
    });
  });
}


/* ============================================================
   8. CONTACT FORM HANDLER
   التعامل مع نموذج التواصل
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // تغيير حالة الزر
    btn.textContent = '[ SENDING... ]';
    btn.disabled = true;

    // محاكاة إرسال (غيّر ده بـ fetch حقيقي لو عندك backend)
    setTimeout(() => {
      btn.textContent = '[ MESSAGE SENT ✓ ]';
      btn.style.background = '#28c840';
      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}


/* ============================================================
   9. CANVAS PARTICLE BACKGROUND
   جسيمات متحركة في خلفية الـ hero
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // ضبط حجم الـ canvas
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ======================================================
  // لتغيير عدد الجسيمات غيّر COUNT
  // لتغيير لونها غيّر color في draw
  // ======================================================
  const COUNT = 60;
  const particles = [];

  // إنشاء الجسيمات
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.4,
      vy:    (Math.random() - 0.5) * 0.4,
      size:  Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      // تحريك الجسيم
      p.x += p.vx;
      p.y += p.vy;

      // لو خرج من الحدود يرجع من الطرف الثاني
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // رسم الجسيم
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 225, ${p.alpha})`;
      ctx.fill();

      // رسم خطوط بين الجسيمات القريبة
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - p.x;
        const dy = particles[j].y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 225, ${0.05 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}


/* ============================================================
   10. INIT - تشغيل كل الـ functions
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initSmoothScroll();
  initScrollReveal();
  initTypingEffect();
  initTerminalOnVisible();
  initActiveNav();
  initContactForm();
  initParticles();

  // تحديث السنة في الـ footer تلقائياً
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
