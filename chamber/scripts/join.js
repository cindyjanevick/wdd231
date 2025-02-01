// Membership info array
const membershipInfo = [
    {
        "name": "Non-Profit Membership",
        "level": "np",
        "cost": "Free",
        "benefits": "Provides basic community exposure and networking opportunities, ideal for smaller organizations or individuals just starting out."
    },
    {
        "name": "Bronze Membership",
        "level": "bronze",
        "cost": "¥7600/year",
        "benefits": "Offers better community visibility than the Non-Profit membership, with additional networking opportunities and more promotional support."
    },
    {
        "name": "Silver Membership",
        "level": "silver",
        "cost": "¥15500/year",
        "benefits": "Provides good community exposure, with more prominent visibility compared to Bronze, and priority access to networking events and increased promotional efforts."
    },
    {
        "name": "Gold Membership",
        "level": "gold",
        "cost": "¥32000/year",
        "benefits": "The most exclusive membership, offering the highest level of community exposure, premium access to top-tier events, and priority promotional support, providing maximum visibility and influence."
    }
];

// Once the DOM is fully loaded, bind events to the cards
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    // Iterate over each card
    cards.forEach((card) => {
        const membershipLevel = card.getAttribute("data-membership");
        const dialog = card.querySelector(".membership-dialog");

        // Safeguard against missing dialog
        if (!dialog) {
            console.warn("Dialog not found in this card.");
            return;
        }

        const closeButton = dialog.querySelector(".close-button");

        // Safeguard against missing close button
        if (!closeButton) {
            console.warn("Close button not found in dialog.");
            return;
        }

        // Open the modal when the card is clicked
        card.addEventListener("click", () => {
            if (!dialog.open) {
                const membershipData = membershipInfo.find(member => member.level === membershipLevel);
                if (membershipData) {
                    updateDialogContent(dialog, membershipData); // Populate dialog with membership data
                    dialog.showModal(); // Show the dialog
                } else {
                    console.warn("Membership data not found for level:", membershipLevel);
                }
            }
        });

        // Close the modal when the close button is clicked
        closeButton.addEventListener("click", (event) => {
            dialog.close();
            event.stopPropagation(); // Prevent triggering card click event when closing
        });
    });

    // Function to update the dialog content dynamically based on the membership info
    function updateDialogContent(dialog, member) {
        const titleElement = dialog.querySelector("h4");
        const contentElement = dialog.querySelector("p");

        // Safeguard against missing title or content elements
        if (!titleElement || !contentElement) {
            console.error("Missing elements in dialog to update content.");
            return;
        }

        // Update dialog content using the membership data
        titleElement.textContent = `${member.name}`;
        contentElement.innerHTML = `
            <p><strong>Cost: </strong>${member.cost}</p>
            <p><strong>Benefits: </strong>${member.benefits}</p>
        `;
    }
});
