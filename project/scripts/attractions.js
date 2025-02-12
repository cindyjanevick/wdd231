// Fetch the attractions data from the JSON file
fetch('data/attractions.json')
    .then(response => response.json())
    .then(data => {
        const attractionsContainer = document.getElementById('attractions-container');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Function to render attraction cards
        function renderAttractions(attractions) {
            attractionsContainer.innerHTML = ''; // Clear existing content
            attractions.forEach(attraction => {
                const card = document.createElement('div');
                card.classList.add('attraction-card');
                card.innerHTML = `
                    <img src="${attraction.image_url}" alt="${attraction.name}" class="attraction-image" loading="lazy">
                    <h3>${attraction.name}</h3>
                    <p>${attraction.address}</p>
                    <p>${attraction.description}</p>
                    <p><strong>Cost:</strong> ${attraction.cost}</p>
                    <a href="${attraction.url}" target="_blank">
                    <button class="learn-more-btn-attraction">Learn More</button>
                    </a>
                `;
                attractionsContainer.appendChild(card);
            });
        }

        // Render all attractions by default
        renderAttractions(data);

        // Add event listeners for category filters
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                const filteredAttractions = data.filter(attraction => {
                    if (category === 'all') return true;
                    if (category === 'free' && attraction.cost === 'Free') return true;
                    if (category === 'paid' && attraction.cost !== 'Free') return true;
                    if (category === 'culture' && attraction.categories.includes('Culture')) return true;
                    if (category === 'nature' && attraction.categories.includes('Nature')) return true;
                    return false;
                });
                renderAttractions(filteredAttractions);
            });
        });
    })
    .catch(error => {
        console.error('Error loading attractions data:', error);
    });

// Function to show more details for an attraction
function showAttractionDetails(name) {
    alert(`You clicked on ${name}! Display more details about this attraction.`);
}

//asdfasdf