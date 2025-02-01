const url = "data/member-level.json";

const modal = document.querySelector("#membershipModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const closeModal = document.querySelector("#closeModal");

// Attach event listeners to the static membership cards
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", async () => {
        const membershipLevel = card.getAttribute("data-membership");
        
        // Fetch and filter data for the selected membership
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const selectedLevel = data.memberLevels.find(item => item.level === membershipLevel);

                if (selectedLevel) {
                    displayLevelDetails(selectedLevel);
                } else {
                    console.error("Membership level not found in JSON.");
                }
            } else {
                throw new Error("Failed to fetch membership data.");
            }
        } catch (error) {
            console.error(error);
        }
    });
});

// Function to display modal with membership info
function displayLevelDetails(item) {
    // Remove existing color classes
    modal.classList.remove("bronze", "silver", "gold", "np");
    
    // Add class based on membership level
    modal.classList.add(item.level);

    modalTitle.textContent = item.name;
    modalDescription.innerHTML = `
        <p><strong>Membership Cost:</strong> ${item.cost}</p>
        <p><strong>Membership Benefits:</strong> ${item.benefits}</p>
    `;

    modal.showModal();
}

// Close modal when clicking the close button
closeModal.addEventListener("click", () => modal.close());
