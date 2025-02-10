// Sample tour data
const tours = [
    {
        id: 1,
        name: "Tokyo City Tour",
        description: "Explore the most iconic landmarks in Tokyo, guided by local experts. Includes transportation and entrance fees.",
        image: "images/tokyotour.webp",
        cost: "¥7,500",
        duration: "4 hours"
    },
    {
        id: 2,
        name: "Mt. Fuji Day Trip",
        description: "A scenic full-day tour to Japan’s tallest mountain, including breathtaking views and cultural experiences.",
        image: "images/fuji.webp",
        cost: "¥18,000",
        duration: "8 hours"
    },
    {
        id: 3,
        name: "Sumo Experience",
        description: "Witness the strength of sumo wrestlers up close and learn about the history of Japan’s national sport.",
        image: "images/sumo.webp",
        cost: "¥10,500",
        duration: "3 hours"
    },
    {
        id: 4,
        name: "Kyoto Cultural Tour",
        description: "Discover Kyoto's ancient temples, stunning gardens, and traditional tea houses. A journey through Japan’s historic heart.",
        image: "images/kyoto.webp",
        cost: "¥12,000",
        duration: "6 hours"
    },
    {
        id: 5,
        name: "Osaka Nightlife Tour",
        description: "Experience the vibrant nightlife of Osaka, including visits to popular bars, restaurants, and entertainment districts.",
        image: "images/osaka.webp",
        cost: "¥6,000",
        duration: "4 hours"
    },
    {
        id: 6,
        name: "Hiroshima Peace Memorial Tour",
        description: "A somber yet powerful visit to the Hiroshima Peace Memorial Park, exploring the city's tragic history and its message of peace.",
        image: "images/hiroshima.webp",
        cost: "¥8,000",
        duration: "5 hours"
    }

];

// Function to generate and display tour cards
function loadTours() {
    const toursList = document.getElementById("tours-list");
    if (!toursList) {
        console.error("Tours list container not found!");
        return;
    }

    // Clear existing content
    toursList.innerHTML = "";

    // Create tour cards
    tours.forEach(tour => {
        const tourCard = document.createElement("div");
        tourCard.classList.add("tour-card");
        tourCard.innerHTML = `
            <img src="${tour.image}" alt="${tour.name}" class="tour-image">
            <h3>${tour.name}</h3>
            <p><strong>Cost:</strong> ${tour.cost}</p>
            <p><strong>Duration:</strong> ${tour.duration}</p>
            <button class="details-btn" data-tour-id="${tour.id}">See details</button>
        `;

        toursList.appendChild(tourCard);
    });

    // Attach event listeners for the details buttons
    document.querySelectorAll(".details-btn").forEach(button => {
        button.addEventListener("click", function () {
            const tourId = parseInt(this.getAttribute("data-tour-id"));
            showTourDetails(tourId);
        });
    });
}

// Function to show tour details in a modal
function showTourDetails(tourId) {
    const tour = tours.find(t => t.id === tourId);
    if (!tour) {
        console.error("Tour not found:", tourId);
        return;
    }

    const modal = document.getElementById("tour-modal");
    const tourDetails = document.getElementById("tour-details");

    // Insert tour details
    tourDetails.innerHTML = `
        <h2>${tour.name}</h2>
        
        <p>${tour.description}</p>
        <p><strong>Cost:</strong> ${tour.cost} per person</p>
        <p><strong>Duration:</strong> ${tour.duration}</p>
    `;

    // Show modal
    modal.style.display = "block";
}

// Function to close the modal
function closeTourModal() {
    document.getElementById("tour-modal").style.display = "none";
}

// Ensure tours load after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadTours();

    // Event listener for closing the tour modal
document.getElementById('close-tour-modal-btn').addEventListener('click', () => {
    const modal = document.getElementById('tour-modal');
    modal.style.display = 'none';
});


    // Close modal when clicking outside of it
    document.getElementById("tour-modal").addEventListener("click", function (event) {
        if (event.target === this) {
            closeTourModal();
        }
    });
});
