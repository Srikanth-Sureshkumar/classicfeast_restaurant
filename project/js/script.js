  // === Counter Section ===
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    let started = false;

  // Ease-out cubic (smooth + premium)
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  
  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const duration = 2000; // total animation time (ms)
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const value = Math.floor(easedProgress * target);

      counter.innerText = value.toLocaleString() + "+";

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString() + "+";
      }
    };

    requestAnimationFrame(update);
  };

  const startCounters = () => {
    counters.forEach(counter => animateCounter(counter));
  };

  // Trigger when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        startCounters();
      }
    });
  }, { threshold: 0.6 });

  observer.observe(document.querySelector("#counting"));
});


  // === Event Section Card Slider ===
  const slider = document.getElementById("cardSlider");
  const cards = document.querySelectorAll(".slider-card");
  let index = 0;

  setInterval(() => {
    index++;
    if (index > cards.length - 3) {
      index = 0;
    }
    slider.style.transform = `translateX(-${index * cards[0].offsetWidth}px)`;
  }, 4000);


  // === SuccessAlert message for reservation button ===
  const form = document.getElementById("reservationForm");
  const successAlert = document.getElementById("successAlert");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.classList.remove("show");
    successAlert.classList.add("show");
  });


  // === Success message for Contact Section ===
 const contactFormElement = document.getElementById('contactForm');
  const contactSubmitButton = document.getElementById('submitBtn');

  function handleContactSubmit(e) {
    e.preventDefault(); // prevent actual form submission

    if (contactFormElement.checkValidity()) {
      // Add success class for animation
      contactSubmitButton.classList.add('success');
      contactSubmitButton.textContent = "Message Sent ✅";
      contactSubmitButton.disabled = true; // prevent multiple clicks

      // Reset form & button after 2 seconds
      setTimeout(() => {
        contactSubmitButton.classList.remove('success');
        contactSubmitButton.textContent = "Send Message";
        contactSubmitButton.disabled = false;
        contactFormElement.reset();
      }, 2000);
    } else {
      contactFormElement.reportValidity(); // show HTML5 validation messages
    }
  }

  contactFormElement.addEventListener('submit', handleContactSubmit);


  window.onload = function () {
    var welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();
  };
