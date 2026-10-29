const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuToggle.textContent = open ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.textContent = '☰';
  });
});

// Typing animation
const typingText = document.getElementById('typing-text');
const roles = ['BCA Student', 'Web Developer', 'Creative Learner'];
let roleIndex = 0, charIndex = roles[0].length, deleting = true;
function typeRole() {
  const role = roles[roleIndex];
  if (deleting) {
    charIndex--;
    typingText.textContent = role.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeRole, 65);
  } else {
    const next = roles[roleIndex];
    charIndex++;
    typingText.textContent = next.slice(0, charIndex);
    if (charIndex >= next.length) {
      deleting = true;
      setTimeout(typeRole, 1300);
    } else setTimeout(typeRole, 90);
  }
}
setTimeout(typeRole, 1300);

// Highlight the navigation item for the visible section
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form opens the visitor's email app. Replace the sample address below.
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = document.getElementById('visitor-name').value.trim();
  const email = document.getElementById('visitor-email').value.trim();
  const subject = document.getElementById('visitor-subject').value.trim();
  const message = document.getElementById('visitor-message').value.trim();
  const recipient = 'YOUR_EMAIL@example.com'; // Replace with your real email
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  document.getElementById('form-status').textContent =
    'Opening your email app. Update the sample email address in script.js first.';
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
});
