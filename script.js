const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselWidth = carouselContainer.offsetWidth;
const itemWidth = carouselItems[0].offsetWidth;
const minTranslate = 0;
const maxTranslate = (carouselItems.length - 1) * itemWidth * -1;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

carouselContainer.addEventListener('mousedown', startDrag);
carouselContainer.addEventListener('touchstart', startDrag);

carouselContainer.addEventListener('mousemove', drag);
carouselContainer.addEventListener('touchmove', drag);

carouselContainer.addEventListener('mouseup', endDrag);
carouselContainer.addEventListener('touchend', endDrag);
carouselContainer.addEventListener('mouseleave', endDrag);
carouselContainer.addEventListener('touchcancel', endDrag);

// Botón de "Anterior"
const prevButton = document.querySelector('.prev-button');
prevButton.addEventListener('click', () => moveCarousel(-1));

// Botón de "Siguiente"
const nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', () => moveCarousel(1));

function startDrag(event) {
  if (event.type === 'touchstart') {
    startPosition = event.touches[0].clientX;
  } else {
    startPosition = event.clientX;
    carouselContainer.style.cursor = 'grabbing';
  }

  isDragging = true;
  prevTranslate = currentTranslate;
}

function drag(event) {
  if (!isDragging) return;

  event.preventDefault();

  let currentPosition = 0;
  if (event.type === 'touchmove') {
    currentPosition = event.touches[0].clientX;
  } else {
    currentPosition = event.clientX;
  }

  const translateDiff = currentPosition - startPosition;
  currentTranslate = prevTranslate + translateDiff;

  // Limitar el desplazamiento dentro de los límites
  if (currentTranslate > minTranslate) {
    currentTranslate = minTranslate;
  } else if (currentTranslate < maxTranslate) {
    currentTranslate = maxTranslate;
  }

  carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function endDrag() {
  isDragging = false;
  carouselContainer.style.cursor = 'grab';
}

function moveCarousel(direction) {
  const translateDiff = direction * itemWidth;
  currentTranslate += translateDiff;

  // Limitar el desplazamiento dentro de los límites
  if (currentTranslate > minTranslate) {
    currentTranslate = minTranslate;
  } else if (currentTranslate < maxTranslate) {
    currentTranslate = maxTranslate;
  }

  carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
}
