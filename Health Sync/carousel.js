const carousel = document.querySelector(".carousel");
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  let index = 0;

  function showSlide(i) {
    slides.forEach((s, idx) => s.style.display = idx === i ? "block" : "none");
  }

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);

  showSlide(index);
}