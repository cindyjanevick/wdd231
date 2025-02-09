// Visitor Message Logic
document.addEventListener("DOMContentLoaded", () => {
    const messageArea = document.getElementById("visit-message");
    if (!messageArea) return; // Safety check

    const currentDate = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        messageArea.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = Number(lastVisit);
        const daysBetween = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));

        if (daysBetween < 1) {
            messageArea.textContent = "Back so soon! Awesome!";
        } else {
            messageArea.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? "day" : "days"} ago.`;
        }
    }

    // Store the current visit timestamp after processing message
    localStorage.setItem("lastVisit", currentDate);
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!");

    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    
    const modalTitle = document.querySelector('.modal-title');
    const modalImage = document.querySelector('.modal-image');
    const modalAddress = document.querySelector('.modal-address');
    const modalDescription = document.querySelector('.modal-description');

    // Load JSON File
    fetch('data/attractions.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load JSON");
            return response.json();
        })
        .then(data => {
            console.log("✅ JSON Loaded:", data);

            const attractions = data.attractions;

            // Attach click event to each card
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', () => {
                    const modalId = card.getAttribute('data-modal');
                    console.log("🖱 Clicked on:", modalId);

                    const modalContent = attractions.find(attraction => attraction.id === modalId);

                    if (modalContent) {
                        console.log("🎯 Found Modal Content:", modalContent);

                        // Set modal content
                        modalTitle.textContent = modalContent.title || "No Title";
                        modalImage.src = modalContent.image || 'default.jpg';
                        modalImage.alt = modalContent.title || "Image";
                        modalAddress.textContent = modalContent.address || "No address available";
                        modalDescription.textContent = modalContent.description || "No description available.";

                        // Show modal
                        modal.classList.add('show');
                        modal.classList.remove('hidden');
                    } else {
                        console.error("❌ No modal content found for:", modalId);
                    }
                });
            });
        })
        .catch(error => console.error("🚨 Error loading attractions.json:", error));

    // Close Modal Logic
    closeButton.addEventListener('click', () => {
        console.log("❌ Closing modal...");
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            console.log("❌ Clicked outside, closing modal...");
            modal.classList.remove('show');
        }
    });
});
