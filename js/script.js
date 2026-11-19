// Ama's Plant Corner — script.js

// === SECTION 0: Hero background carousel pause/play (WCAG 2.2.2 Pause, Stop, Hide) ===
const carouselToggle = document.getElementById('carousel-toggle');
const hero = document.querySelector('.hero');

if (carouselToggle && hero) {
  carouselToggle.addEventListener('click', () => {
    const isPaused = hero.classList.toggle('is-paused');
    carouselToggle.setAttribute('aria-pressed', String(isPaused));
    carouselToggle.setAttribute(
      'aria-label',
      isPaused ? 'Play background animation' : 'Pause background animation'
    );
    const textSpan = carouselToggle.querySelector('.hero__carousel-control-text');
    if (textSpan) {
      textSpan.textContent = isPaused ? 'Play' : 'Pause';
    }
  });
}

// === SECTION 1: Plant care guide accordion ===
// Each .guide-trigger should expand and collapse its paired .guide-body when clicked.

// === SECTION 2: Inquiry tracker ===
// When the inquiry form is submitted, add the customer's name and question
// to the list below the form. Prevent the page from refreshing on submit.

// === SECTION 3: Contact form ===
// Validate the contact form before submission.
// Show a success message when all fields are correctly filled in.
// If a required field is missing, tell the user what needs to be fixed.
