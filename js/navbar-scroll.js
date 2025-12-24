// Navbar Scroll Effect - Renk Tersine Çevirme
function handleNavbarScroll() {
    const navbar = document.querySelector('nav');
    
    if (!navbar) return;
    
    if (window.scrollY > 80) {
        // Scroll yapıldığında - Beyaz arkaplan, koyu yazılar
        navbar.classList.add('nav-scrolled');
        navbar.classList.remove('nav-transparent');
    } else {
        // Sayfa başındayken - Şeffaf arkaplan, açık yazılar
        navbar.classList.remove('nav-scrolled');
        navbar.classList.add('nav-transparent');
    }
}

// Scroll eventi
window.addEventListener('scroll', handleNavbarScroll);

// Sayfa yüklendiğinde ve DOM hazır olduğunda
window.addEventListener('load', handleNavbarScroll);
document.addEventListener('DOMContentLoaded', handleNavbarScroll);

// Navbar yüklendiğinde tekrar kontrol et (dinamik yükleme için)
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            const navbar = document.querySelector('nav');
            if (navbar) {
                handleNavbarScroll();
                observer.disconnect(); // Navbar bulundu, artık izlemeye gerek yok
            }
        }
    });
});

// Body'yi izle
observer.observe(document.body, {
    childList: true,
    subtree: true
});