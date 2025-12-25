document.addEventListener('DOMContentLoaded', () => {

  const waitForSlider = setInterval(() => {
    const slider = document.getElementById('servicesSlider');
    const dotsContainer = document.getElementById('servicesDots');

    if (!slider || !dotsContainer) return;

    clearInterval(waitForSlider);

    const originalCards = Array.from(slider.children);
    const gap = 24;
    
    // Kart genişliğini dinamik hesapla
    function getCardWidth() {
      return originalCards[0].offsetWidth + gap;
    }

    // 🔁 TÜM kartları 3 kez klonla (kesintisiz döngü için)
    const clones = [];
    for (let i = 0; i < 3; i++) {
      originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
        clones.push(clone);
      });
    }

    let currentPosition = 0;
    let isAnimating = false;

    // DOTS (SADECE ORİJİNALLER)
    originalCards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.onclick = () => {
        if (isAnimating) return;
        goToSlide(i);
        restartAuto();
      };
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateDots() {
      const activeIndex = Math.round(Math.abs(currentPosition) / getCardWidth()) % originalCards.length;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIndex);
      });
    }

    function goToSlide(targetIndex) {
      isAnimating = true;
      const cardWidth = getCardWidth();
      currentPosition = -(targetIndex * cardWidth);
      
      slider.style.transition = 'transform 0.7s ease-out';
      slider.style.transform = `translateX(${currentPosition}px)`;
      updateDots();
    }

    function slideNext() {
      if (isAnimating) return;
      
      isAnimating = true;
      const cardWidth = getCardWidth();
      currentPosition -= cardWidth;
      
      slider.style.transition = 'transform 0.7s ease-out';
      slider.style.transform = `translateX(${currentPosition}px)`;
      updateDots();
    }

    // Sonsuz döngü için reset
    slider.addEventListener('transitionend', () => {
      isAnimating = false;
      
      const cardWidth = getCardWidth();
      const totalOriginalWidth = originalCards.length * cardWidth;
      
      // Eğer ilk setin sonuna geldiyse, görünmeden ikinci sete atla
      if (Math.abs(currentPosition) >= totalOriginalWidth) {
        slider.style.transition = 'none';
        currentPosition = 0;
        slider.style.transform = `translateX(${currentPosition}px)`;
        updateDots();
      }
    });

    let auto;

    function startAuto() {
      auto = setInterval(() => {
        slideNext();
      }, 4000);
    }

    function restartAuto() {
      clearInterval(auto);
      startAuto();
    }

    // Başlangıç
    updateDots();
    startAuto();

    // Responsive için resize event
    window.addEventListener('resize', () => {
      const cardWidth = getCardWidth();
      const activeIndex = Math.round(Math.abs(currentPosition) / cardWidth) % originalCards.length;
      currentPosition = -(activeIndex * cardWidth);
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${currentPosition}px)`;
    });

  }, 100);

});