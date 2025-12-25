// WhatsApp Modal - Basit ve Garantili Versiyon
document.addEventListener('DOMContentLoaded', function() {
    
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappLink = document.getElementById('whatsapp-link');
    const whatsappModal = document.getElementById('whatsapp-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelModalBtn = document.getElementById('cancel-modal');
    
    // Modal açma fonksiyonu
    function openModal() {
        console.log('Modal açılıyor');
        if (whatsappModal) {
            whatsappModal.classList.remove('hidden');
            whatsappModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Modal kapama fonksiyonu
    function closeModal() {
        console.log('Modal kapanıyor');
        if (whatsappModal) {
            whatsappModal.classList.add('hidden');
            whatsappModal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }
    
    // Event listener'ları ekle
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    }
    
    // WhatsApp linki varsa (direkt link için)
    if (whatsappLink) {
        // Masaüstünde direkt aç, mobilde modal göster
        whatsappLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Mobil cihaz
                e.preventDefault();
                openModal();
            }
            // Masaüstünde direkt link çalışır
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeModal);
    }
    
    // Modal dışına tıklayarak kapatma
    if (whatsappModal) {
        whatsappModal.addEventListener('click', function(e) {
            if (e.target === whatsappModal) {
                closeModal();
            }
        });
    }
    
    // ESC tuşu ile kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && whatsappModal && !whatsappModal.classList.contains('hidden')) {
            closeModal();
        }
    });
});