// Fetch the JSON data and create cards dynamically
fetch('attractions.json')
  .then(response => response.json())
  .then(data => {
    const cardsContainer = document.querySelector('.grid-container1');

    // Loop through the attractions and create card elements
    data.attractions.forEach(attraction => {
      const card = document.createElement('article');
      card.classList.add('card');
      card.setAttribute('data-modal', attraction.id);  // Set the data-modal attribute

      // Add the card content
      card.innerHTML = `
        <h2>${attraction.title}</h2>
        <figure>
          <img src="${attraction.image}" alt="${attraction.title}">
        </figure>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <button class="open-modal">Learn More</button>
      `;

      // Append the card to the container
      cardsContainer.appendChild(card);
    });

    // Modal Logic
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');

    // Modal elements
    const modalTitle = document.querySelector('.modal-title');
    const modalImage = document.querySelector('.modal-image');
    const modalAddress = document.querySelector('.modal-address');
    const modalDescription = document.querySelector('.modal-description');

    const modals = data.attractions.reduce((acc, attraction) => {
      acc[attraction.id] = {
        title: attraction.title,
        image: attraction.image,
        address: attraction.address,
        description: attraction.description
      };
      return acc;
    }, {});

    // Open modal when clicking on a card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modalContent = modals[modalId];

        if (modalContent) {
          // Set the modal content dynamically
          modalTitle.textContent = modalContent.title || "Default Title";
          modalImage.src = modalContent.image || 'default-image.jpg';
          modalImage.alt = modalContent.title || "Modal Image";
          modalAddress.textContent = modalContent.address || "No address available";
          modalDescription.textContent = modalContent.description || "No description available.";

          modal.classList.add('show'); // Show the modal by adding 'show' class
          modal.classList.remove('hidden'); // Show the modal
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
  })
  .catch(error => console.error('Error loading JSON data:', error));
