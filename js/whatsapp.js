document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("whatsapp-btn");
    const modal = document.getElementById("whatsapp-modal");
    const close = document.getElementById("close-modal");

    if (!btn || !modal) return;

    btn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });

    close.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }
    });
});
