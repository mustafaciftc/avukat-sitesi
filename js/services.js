document.addEventListener('DOMContentLoaded', () => {

  const waitForSlider = setInterval(() => {
    const slider = document.getElementById('servicesSlider');
    const dotsContainer = document.getElementById('servicesDots');

    if (!slider) return;

    clearInterval(waitForSlider);

    const cards = slider.children;
    const cardWidth = cards[0].offsetWidth + 24;
    let index = 0;

    // dots oluştur
    [...cards].forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.onclick = () => goTo(i);
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.children;

    function update() {
      slider.style.transform = `translateX(-${index * cardWidth}px)`;
      [...dots].forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');
    }

    function goTo(i) {
      index = i;
      update();
    }

    // otomatik
    setInterval(() => {
      index = (index + 1) % cards.length;
      update();
    }, 4000);

    update();

  }, 100);

});
