document.addEventListener('DOMContentLoaded', function() {
    loadComponent('navbar', '/partials/navbar.html');
    loadComponent('hero', '/partials/hero.html');
    loadComponent('about', '/partials/about.html');
    loadComponent('services', '/partials/services.html');
    loadComponent('experience', '/partials/experience.html');
    loadComponent('contact', '/partials/contact.html');
    loadComponent('footer', '/partials/footer.html');
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = data;

                // Her component yüklendikten sonra script'leri yeniden başlat
                // Özellikle navbar ve contact kritik
                if (id === 'navbar' || id === 'contact' || id === 'footer') {
                    initializeScripts();
                }
            }
        })
        .catch(error => {
            console.error(`Bileşen yüklenemedi ${id}:`, error);
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = `<div class="text-red-500 p-8 text-center">Bileşen yüklenemedi: ${error.message}</div>`;
            }
        });
}