const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const navLinks = document.querySelectorAll('.primary-nav a');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav) {
      nav.classList.remove('open');
    }
    document.body.classList.remove('menu-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      panel.hidden = true;
    });

    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    const panel = document.getElementById(`${button.dataset.tab}-panel`);
    if (panel) {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('active'));
    }
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const success = form.querySelector('.form-success');
    if (success) {
      success.hidden = false;
    }
    form.reset();
  });
}

document.querySelectorAll('#year').forEach(year => {
  year.textContent = new Date().getFullYear();
});
