document.addEventListener("DOMContentLoaded", () => {
    // Fetch membership details from the JSON file
    fetch('data/member-level.json')
        .then(response => response.json())
        .then(data => {
            const memberLevels = data.memberLevels;
            const cards = document.querySelectorAll(".card");

            cards.forEach(card => {
                const membershipType = card.getAttribute("data-membership"); // Get the membership level (e.g., np, bronze)
                const modal = card.querySelector(".membership-dialog");
                const closeButton = modal.querySelector(".close-button");

                // Find the relevant membership data from the JSON based on membership type
                const membershipData = memberLevels.find(level => level.level === membershipType);

                // Open the modal when the card is clicked
                card.addEventListener("click", () => {
                    if (membershipData && !modal.open) {
                        // Update the modal with fetched membership details
                        const modalTitle = modal.querySelector("h4");
                        const modalDescription = modal.querySelector("p");

                        // Set the modal content with the JSON data
                        modalTitle.textContent = membershipData.name;
                        modalDescription.innerHTML = `<strong>Cost:</strong> ${membershipData.cost}<br><br><strong>Benefits:</strong> ${membershipData.benefits}`;

                        modal.showModal();
                    }
                });

                // Close the modal when the close button is clicked
                closeButton.addEventListener("click", (event) => {
                    modal.close();
                    event.stopPropagation(); // Prevent triggering card click event when closing
                });
            });
        })
        .catch(error => {
            console.error("Error fetching membership data:", error);
        });
});
