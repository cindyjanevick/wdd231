document.addEventListener("DOMContentLoaded", () => {
    const tourNameSelect = document.getElementById("tour-name");

    if (!tourNameSelect) {
        console.error("Dropdown not found!");
        return;
    }

    const tourNames = [
        "Shibuya Crossing Tour",
        "Meiji Shrine Tour",
        "Ginza Shopping & Dining",
        "Tokyo Tower & Skyscraper Views",
        "Odaiba Shopping & Entertainment",
        "Akihabara Electronics Tour"
    ];

    tourNames.forEach(tour => {
        const option = document.createElement("option");
        option.value = tour;
        option.textContent = tour;
        tourNameSelect.appendChild(option);
    });
});
