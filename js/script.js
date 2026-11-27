// Ama's Plant Corner — script.js

// === SECTION 0: Hero background carousel pause/play (WCAG 2.2.2 Pause, Stop, Hide) ===
const carouselToggle = document.getElementById("carousel-toggle");
const hero = document.querySelector(".hero");

if (carouselToggle && hero) {
  carouselToggle.addEventListener("click", () => {
    const isPaused = hero.classList.toggle("is-paused");
    carouselToggle.setAttribute(
      "aria-label",
      isPaused ? "Play background animation" : "Pause background animation",
    );
    const textSpan = carouselToggle.querySelector(
      ".hero__carousel-control-text",
    );
    if (textSpan) {
      textSpan.textContent = isPaused ? "Play" : "Pause";
    }
  });
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const contactFormStatus = contactForm.querySelector(".contact-form__status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactFormStatus) {
      console.error("Contact form status message is missing.");
      return;
    }

    contactFormStatus.textContent =
      "Demo: Thanks! Your message passed validation successfully. Ama would get back to you as soon as possible.";
    contactFormStatus.hidden = false;
  });
}
