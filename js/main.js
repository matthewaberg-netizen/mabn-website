// Navigation scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu toggle
const toggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

// Scroll-triggered fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// UNSPSC codes toggle
const codesBtn = document.querySelector('.codes-toggle button');
const codesPanel = document.querySelector('.codes-panel');
if (codesBtn && codesPanel) {
  codesBtn.addEventListener('click', () => {
    codesPanel.classList.toggle('open');
    codesBtn.textContent = codesPanel.classList.contains('open')
      ? 'Hide UNSPSC Codes'
      : 'View UNSPSC Codes';
  });
}

// Project gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
let currentImages = [];
let currentCaptions = [];
let currentIndex = 0;

function openLightbox(images, captions, index) {
  currentImages = images;
  currentCaptions = captions;
  currentIndex = index || 0;
  updateLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateLightbox() {
  lightboxImg.src = currentImages[currentIndex];
  lightboxCaption.textContent = currentCaptions[currentIndex] || '';
  lightboxCounter.textContent = currentImages.length > 1
    ? (currentIndex + 1) + ' / ' + currentImages.length
    : '';
  document.querySelector('.lightbox-prev').style.display = currentImages.length > 1 ? '' : 'none';
  document.querySelector('.lightbox-next').style.display = currentImages.length > 1 ? '' : 'none';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightbox();
});
document.querySelector('.lightbox-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightbox();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
  }
  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
  }
});

document.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card[data-gallery]');
  if (!card || card.classList.contains('video-card')) return;
  e.preventDefault();
  e.stopPropagation();
  const imagesAttr = card.dataset.images;
  const captionsAttr = card.dataset.captions;
  let images, captions;
  if (imagesAttr) {
    images = JSON.parse(imagesAttr);
    captions = JSON.parse(captionsAttr || '[]');
  } else {
    const img = card.querySelector('img');
    const p = card.querySelector('.project-overlay p');
    images = [img.src];
    captions = [p ? p.textContent : ''];
  }
  openLightbox(images, captions, 0);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
