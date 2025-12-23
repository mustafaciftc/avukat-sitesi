
document.addEventListener('DOMContentLoaded', () => {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const modal = document.getElementById('whatsapp-modal');
    const closeModal = document.getElementById('close-modal');

    if (whatsappBtn && modal && closeModal) {
        whatsappBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });

        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });

        // Dışarı tıklayınca kapat
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });

        // Esc tuşu ile kapat
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    }
});
