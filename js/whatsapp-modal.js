
(function () {
    'use strict';

    const WHATSAPP_NUMBER = "905533419509";
    const PRE_MESSAGE = "Merhaba%2C%20hukuki%20danışmanlık%20için%20ulaşıyorum.";

    const whatsappHTML = `
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${PRE_MESSAGE}"
           target="_blank"
           id="whatsapp-link"
           class="fixed bottom-8 left-8 w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center text-3xl">
            <i class="fab fa-whatsapp"></i>
        </a>

        <div id="whatsapp-modal" class="fixed inset-0 bg-black/70 z-50 hidden flex items-center justify-center p-4">
            <div class="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-gold/30 relative">
                <button id="close-modal" class="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">
                    <i class="fas fa-times"></i>
                </button>
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fab fa-whatsapp text-white text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">WhatsApp'tan Yazın</h3>
                    <p class="text-slate-300 text-sm">Doğrudan WhatsApp üzerinden iletişime geçin</p>
                </div>
                <div class="space-y-3">
                    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${PRE_MESSAGE}"
                       target="_blank"
                       class="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-center">
                        <i class="fab fa-whatsapp mr-2"></i> WhatsApp'ta Aç
                    </a>
                    <button id="cancel-modal" class="block w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg text-center">
                        İptal
                    </button>
                </div>
            </div>
        </div>
    `;

    // Gerekli CSS (eğer yoksa ekler)
    function addStyles() {
        if (document.getElementById('whatsapp-dynamic-styles')) return;

        const style = document.createElement('style');
        style.id = 'whatsapp-dynamic-styles';
        style.textContent = `
            #whatsapp-modal {
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                display: none;
            }
            #whatsapp-modal.show {
                opacity: 1;
                visibility: visible;
                display: flex;
            }
        `;
        document.head.appendChild(style);
    }

    function injectWhatsApp() {
        if (document.getElementById('whatsapp-link')) {
            return false;
        }

        document.body.insertAdjacentHTML('beforeend', whatsappHTML);
        return true;
    }

    function isMobile() {
        return window.innerWidth < 768;
    }

    function setupEvents() {
        const link = document.getElementById('whatsapp-link');
        const modal = document.getElementById('whatsapp-modal');
        const closeBtn = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-modal');

        if (!link || !modal) {
            console.warn('WhatsApp elementleri hala bulunamadı.');
            return false;
        }

        link.addEventListener('click', function (e) {
            if (isMobile()) {
                e.preventDefault();
                modal.classList.remove('hidden');
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });

        if ('ontouchstart' in window) {
            link.addEventListener('touchstart', function (e) {
                if (isMobile()) {
                    e.preventDefault();
                    modal.classList.remove('hidden');
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            }, { passive: false });
        }

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
        });

        window.addEventListener('resize', () => {
            if (!isMobile() && !modal.classList.contains('hidden')) closeModal();
        });

        return true;
    }

    // Ana başlatma
    function init() {
        addStyles();

        // Önce HTML'de var mı kontrol et, yoksa enjekte et
        const injected = injectWhatsApp();

        // Enjekte ettiysek veya zaten varsa eventleri kur
        if (injected || document.getElementById('whatsapp-link')) {
            // Kısa bir gecikme ile eventleri kur (DOM güncellensin)
            setTimeout(setupEvents, 100);
        }
    }

    // Sayfa tamamen yüklendikten sonra çalıştır (load-components.js sonrası garanti)
    window.addEventListener('load', init);

    // Ekstra güvenlik: Hemen de dene
    if (document.readyState === 'complete') {
        init();
    }

})();