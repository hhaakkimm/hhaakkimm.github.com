// Smooth fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in, .slide-up').forEach((el) => observer.observe(el));

// Parallax glow for icon
const icon = document.querySelector('.app-icon');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  icon.style.transform = `translate(${x}px, ${y}px)`;
});

// === Fullscreen Screenshot Modal ===
const screenshots = Array.from(document.querySelectorAll('.screenshot img'));
let currentIndex = 0;

// Create modal dynamically if not present
let modal = document.getElementById('screenshot-modal');
if (!modal) {
  modal = document.createElement('div');
  modal.id = 'screenshot-modal';
  modal.className = 'modal hidden';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">✕</span>
      <img id="modal-image" src="" />
      <button class="nav-btn prev">‹</button>
      <button class="nav-btn next">›</button>
    </div>
  `;
  document.body.appendChild(modal);
}

const modalImg = modal.querySelector('#modal-image');
const closeBtn = modal.querySelector('.close-btn');
const nextBtn = modal.querySelector('.next');
const prevBtn = modal.querySelector('.prev');

function openModal(index) {
  currentIndex = index;
  modalImg.src = screenshots[index].src;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function showNext() {
  currentIndex = (currentIndex + 1) % screenshots.length;
  modalImg.src = screenshots[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
  modalImg.src = screenshots[currentIndex].src;
}

screenshots.forEach((img, i) => {
  img.addEventListener('click', () => openModal(i));
});

closeBtn.addEventListener('click', closeModal);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Close on ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

// Close on clicking background
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});


