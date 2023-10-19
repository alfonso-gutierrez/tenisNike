document.addEventListener('DOMContentLoaded', function() {
  const carouselInner = document.querySelector('.carousel-inner');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const carouselItems = document.querySelectorAll('.carousel-item');

  let currentIndex = 0;
  const totalItems = carouselItems.length;
  const itemWidth = carouselItems[0].offsetWidth;

  function moveTo(index) {
    if (index < 0 || index >= totalItems) {
      return;
    }
    carouselInner.style.transform = `translateX(-${index * itemWidth}px)`;
    currentIndex = index;
  }

  function movePrev() {
    moveTo(currentIndex - 1);
  }

  function moveNext() {
    moveTo(currentIndex + 1);
  }

  prevBtn.addEventListener('click', movePrev);
  nextBtn.addEventListener('click', moveNext);
});
