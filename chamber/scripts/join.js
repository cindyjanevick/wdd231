const url = "data/member-level.json";

// Cache DOM elements
const modal = document.querySelector("#membershipModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const closeModal = document.querySelector("#closeModal");

// Add event listeners to cards
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => fetchMembershipData(card));
});

// Fetch and display membership level data
async function fetchMembershipData(card) {
    const membershipLevel = card.getAttribute("data-membership");

    try {
        const data = await fetchData();
        const selectedLevel = data.memberLevels.find(item => item.level === membershipLevel);
        if (selectedLevel) {
            showModal(selectedLevel);
        } else {
            console.error("Membership level not found in data.");
        }
    } catch (error) {
        console.error("Error fetching membership data:", error);
    }
}

// Fetch JSON data
async function fetchData() {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch membership data.");
    return response.json();
}

// Display modal with membership info
function showModal(levelData) {
    modal.classList.remove("bronze", "silver", "gold", "np");
    modal.classList.add(levelData.level);

    modalTitle.textContent = levelData.name;
    modalDescription.innerHTML = `
        <p><strong>Cost:</strong> ${levelData.cost}</p>
        <p><strong>Benefits:</strong> ${levelData.benefits}</p>
    `;
    modal.showModal();
}

// Close modal
closeModal.addEventListener("click", () => modal.close());
