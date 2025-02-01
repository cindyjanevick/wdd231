document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const modal = card.querySelector(".membership-dialog");
        const closeButton = modal.querySelector(".close-button");

        // Open the modal when the card is clicked
        card.addEventListener("click", () => {
            if (!modal.open) {
                modal.showModal();
            }
        });

        // Close the modal when the close button is clicked
        closeButton.addEventListener("click", (event) => {
            modal.close();
            event.stopPropagation(); // Prevent triggering card click event when closing
        });
    });
});
