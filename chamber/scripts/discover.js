// Visitor Message Logic
const currentDate = Date.now();
const lastVisit = localStorage.getItem("lastVisit");
const messageArea = document.getElementById("visit-message");

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

// Store the current visit timestamp
localStorage.setItem("lastVisit", currentDate);

// Modal Logic
// const cards = document.querySelectorAll('.card');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');

// Modal elements
const modalTitle = document.querySelector('.modal-title');
const modalImage = document.querySelector('.modal-image');
const modalAddress = document.querySelector('.modal-address');
const modalDescription = document.querySelector('.modal-description');

const modals = {
    shiroyama: {
        title: "Shiroyama Park",
        image: "images/shiroyama.webp",
        address: "1 Shiroyama, Misawa, Aomori 033-0041, Japan",
        description: "Shiroyama Park is a beautiful park featuring a reconstructed samurai-era castle surrounded by hundreds of cherry trees, ideal for sightseeing and picnics."
    },
    'ice-arena': {
        title: "Misawa Ice Arena",
        image: "images/icearena.webp",
        address: "1-3-10 Miyata, Misawa, Aomori 033-0023, Japan",
        description: "Misawa Ice Arena offers an indoor ice rink for skating and events, perfect for winter fun year-round."
    },
    'misawa-park': {
        title: "Misawa Park",
        image: "images/park.webp",
        address: " 2 Chome-1-1 Misawa, Aomori 033-0031, Japan",
        description: "Misawa Park has a wide variety of activities, including camping sites and cabins for a relaxing outdoor experience."
    },
    'aviation-museum': {
        title: "Misawa Aviation Science Museum",
        image: "images/museum.webp",
        address: "1-1 Chuo, Misawa, Aomori 033-0034, Japan",
        description: "The Misawa Aviation Science Museum exhibits aircraft and aerospace technology, offering an educational experience for aviation enthusiasts."
    },
    'lake-ogawara': {
        title: "Lake Ogawara",
        image: "images/lakeogawara.webp",
        address: "Ogawara, Aomori 039-3554, Japan",
        description: "Lake Ogawara is a large, scenic lake, perfect for fishing, boating, and enjoying nature. It's the eleventh largest lake in Japan."
    },
    'air-base': {
        title: "Misawa Air Base",
        image: "images/airbase.webp",
        address: "Misawa, Japan",
        description: "Misawa Air Base is an important military base shared by the Japan Air Self-Defense Force and the United States Armed Forces, offering unique aviation experiences."
    },
    'kushihiki': {
        title: "Kushihiki Shrine",
        image: "images/shrine.webp",
        address: "1-1 Misawa, Aomori 039-0213, Japan",
        description: "Kushihiki Shrine is one of the oldest Shinto shrines in the region, offering a peaceful and spiritual atmosphere."
    },
    'terayama': {
        title: "Shuji Terayama Museum",
        image: "images/shujiterayama.webp",
        address: "1-7-3 Hachiman, Misawa, Aomori 033-0034, Japan",
        description: "The Shuji Terayama Museum honors the life and works of Shuji Terayama, one of Japan's most influential avant-garde writers and filmmakers."
    }
};

// Open modal when clicking on a card
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modalContent = modals[modalId];

        if (modalContent) {
            // Set the modal content
            modalTitle.textContent = modalContent.title;  // Set the modal title
            modalImage.src = modalContent.image;          // Set the modal image source
            modalImage.alt = modalContent.title;          // Set the image alt text
            modalAddress.textContent = modalContent.address;  // Set the modal address
            modalDescription.textContent = modalContent.description;  // Set the modal description

            modal.classList.add('show'); // Show the modal by adding 'show' class
        }
    });
});

// Close modal when clicking the close button
closeButton.addEventListener('click', () => {
    modal.classList.remove('show'); // Hide the modal by removing 'show' class
});

// Close the modal if clicked outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show'); // Hide the modal if clicked outside
    }
});