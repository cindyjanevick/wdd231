// Sample Event Data (you can fetch this from an API or JSON file)
const events = [
    {
        date: '2025-02-10',
        name: 'Event 1: Tokyo Winter Festival',
        description: 'Join us for the annual Tokyo Winter Festival featuring music, food, and fun activities.',
        url: 'https://www.japan.travel/en/my/experiencing-traditional-events-matsuri/three-winter-festivals-tokyo-suburbs/'
    },
    {
        date: '2025-02-14',
        name: 'Event 2: Valentine\'s Day Concert',
        description: 'Enjoy a romantic concert on Valentine\'s Day with top performers in the city.',
        url: 'https://www.fccj.or.jp/event/tokyo-sinfonia-valentine-serenade-dinner-concert'
    },
    {
        date: '2025-02-20',
        name: 'Event 3: Tokyo Marathon',
        description: 'Watch the runners at Tokyo Marathon and experience the excitement of the city.',
        url: 'https://www.marathon.tokyo/en/participants/guideline/'
    },
    {
        date: '2025-02-21',
        name: 'Event 4: Tokyo International Art Fair',
        description: 'Explore contemporary art at the Tokyo International Art Fair, showcasing works by global artists.',
        url: 'https://www.tokyoartfair.com'
    },
    {
        date: '2025-02-23',
        name: 'Event 5: Tokyo Jazz Festival',
        description: 'Enjoy live performances by world-renowned jazz musicians at the Tokyo Jazz Festival.',
        url: 'https://www.tokyo-jazz.com/en'
    },
    {
        date: '2025-02-26',
        name: 'Event 6: Tokyo Fashion Week',
        description: 'Catch the latest trends at Tokyo Fashion Week, where top designers showcase their new collections.',
        url: 'https://www.tokyofashionweek.com/en/'
    }
];



// Function to create the calendar
function createCalendar(year, month) {
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = ''; // Clear previous calendar

    // Get first day of the month and number of days in the month
    const firstDay = new Date(year, month).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Create days of the week header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        calendarDiv.appendChild(dayDiv);
    });

    // Add empty cells for the first week
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarDiv.appendChild(emptyCell);
    }

    // Add actual days with event highlighting
    for (let date = 1; date <= lastDate; date++) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = date;
        const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;

        // Highlight event days in bold
        if (events.some(event => event.date === dateString)) {
            dateDiv.classList.add('event-day');
            dateDiv.addEventListener('click', () => openModal(dateString)); // Open modal on date click
        }

        calendarDiv.appendChild(dateDiv);
    }
}

// Function to handle modal popup
function openModal(date) {
    const modal = document.getElementById('event-modal-details');
    const modalContent = document.getElementById('modal-event-details');
    const event = events.find(event => event.date === date);

    if (event) {
        // Set event details in modal
        modalContent.innerHTML = `
            <h2>${event.name}</h2>
            <p>${event.description}</p>
            <button id="learn-more-btn" onclick="window.open('${event.url}', '_blank')">Learn More</button>
        `;

        // Show the modal
        modal.style.display = 'block';
    }
}


// Close modal function
function closeModal() {
    const modal = document.getElementById('event-modal-details');
    modal.style.display = 'none';
}

// Event listener for close button
document.getElementById('close-modal-btn').addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('event-modal-details');
    if (event.target === modal) {
        modal.style.display = 'none'; // Close modal if clicked outside
    }
});

// Initialize the calendar for February 2025
createCalendar(2025, 1); // Month is 0-indexed, so 1 means February
