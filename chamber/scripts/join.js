const url = "data/member-level.json";

const modal = document.querySelector("#membershipModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const closeModal = document.querySelector("#closeModal");

// Attach event listeners to the static membership cards
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", async () => {
        const membershipLevel = card.getAttribute("data-membership");

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch membership data.");
            const data = await response.json();
            console.log(data);  // Log the fetched data for debugging
            
            const selectedLevel = data.memberLevels.find(item => item.level === membershipLevel);
            if (selectedLevel) {
                displayLevelDetails(selectedLevel);
            } else {
                console.error("Membership level not found in JSON.");
            }
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    });
});

// Function to display modal with membership info
function displayLevelDetails(item) {
    // Remove existing color classes
    modal.classList.remove("bronze", "silver", "gold", "np");

    // Add class based on membership level
    modal.classList.add(item.level);

    // Update modal content with available properties from the JSON file
    modalTitle.textContent = item.name;
    modalDescription.innerHTML = `
        <p><strong>Membership Cost:</strong> ${item.cost}</p>
        <p><strong>Membership Benefits:</strong> ${item.benefits}</p>
    `;

    modal.showModal();
}

// Close modal when clicking the close button
closeModal.addEventListener("click", () => modal.close());
