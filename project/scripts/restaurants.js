document.addEventListener("DOMContentLoaded", () => {
    const restaurantsContainer = document.getElementById("restaurants-container");
    const cuisineFilter = document.getElementById("cuisine-filter");
    const costFilter = document.getElementById("cost-filter");
    const sortFilter = document.getElementById("sort-filter");

    let restaurantsData = [];

    // Fetch restaurants data
    fetch("data/restaurants.json")
        .then(response => response.json())
        .then(data => {
            restaurantsData = data;
            displayRestaurants(restaurantsData);
        })
        .catch(error => console.error("Error fetching restaurant data:", error));

    // Function to display restaurant cards
    function displayRestaurants(restaurants) {
        restaurantsContainer.innerHTML = "";

        restaurants.forEach((restaurant, index) => {
            const card = document.createElement("article");
            card.classList.add("restaurant-card");

            card.innerHTML = `
                <figure>
                    <img src="${restaurant.image_url}" alt="${restaurant.name}" loading="lazy">
                </figure>
                <div class="restaurant-details">
                    <h3>${restaurant.name}</h3>
                    <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
                    <p><strong>Address:</strong> ${restaurant.address}</p>
                    <p>${restaurant.description}</p>
                    <p><strong>Cost:</strong> ${restaurant.cost}</p>
                </div>
            `;

            restaurantsContainer.appendChild(card);

            // Delayed animation effect on load
            setTimeout(() => {
                card.classList.add("show"); // Applies fade-in effect
            }, index * 150); // Creates a staggered effect
        });
    }

    // Filter function
    function filterRestaurants() {
        const selectedCuisine = cuisineFilter.value;
        const selectedCost = costFilter.value;

        let filtered = restaurantsData.filter(restaurant => {
            const cuisineMatch = selectedCuisine === "all" || restaurant.cuisine.toLowerCase() === selectedCuisine;
            const costMatch = selectedCost === "all" || getCostCategory(restaurant.cost) === selectedCost;
            return cuisineMatch && costMatch;
        });

        // Apply sorting if any
        const sorted = sortRestaurants(filtered);
        displayRestaurants(sorted);
    }

    // Sorting function
    function sortRestaurants(restaurants) {
        const sortOption = sortFilter.value;

        switch (sortOption) {
            case "name":
                return restaurants.sort((a, b) => a.name.localeCompare(b.name));
            case "cost":
                return restaurants.sort((a, b) => getNumericCost(a.cost) - getNumericCost(b.cost));
            default:
                return restaurants;
        }
    }

    // Helper function to extract numeric cost from cost string (removes non-numeric characters)
    function getNumericCost(cost) {
        return parseInt(cost.replace(/[^0-9]/g, "")) || 0; // Removes all non-numeric characters
    }

    // Helper function to categorize cost levels based on numeric cost
    function getCostCategory(cost) {
        const numericCost = getNumericCost(cost);

        if (numericCost <= 7000) return "low";
        if (numericCost <= 20000) return "medium";
        return "high";
    }

    // Event listeners for filters and sort
    cuisineFilter.addEventListener("change", filterRestaurants);
    costFilter.addEventListener("change", filterRestaurants);
    sortFilter.addEventListener("change", filterRestaurants);
});
