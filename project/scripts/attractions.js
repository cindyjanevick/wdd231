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

                // For above-the-fold images, remove lazy loading
                const image = document.createElement('img');
                image.src = attraction.image_url;
                image.alt = attraction.name;
                image.classList.add('attraction-image');
                image.width = 800; // Adjust image width and height as per your needs
                image.height = 600;

                // Check if the image is above-the-fold (e.g., first attraction or critical content)
                if (attraction === data[0]) { // Change condition based on your layout
                    image.removeAttribute('loading'); // Remove lazy loading for the first attraction
                } else {
                    image.setAttribute('loading', 'lazy'); // Apply lazy loading to others
                }

                card.appendChild(image);
                card.innerHTML += `
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
