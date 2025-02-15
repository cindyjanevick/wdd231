document.addEventListener("DOMContentLoaded", () => {
    const tourNameSelect = document.getElementById("tour-name");
    const dateInput = document.getElementById("tour-date");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const form = document.getElementById("booking-form");

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

    // Prevent past dates
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }

    // Validate name fields (only letters)
    function validateTextInput(input) {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(input.value)) {
            input.setCustomValidity("Only letters are allowed.");
        } else {
            input.setCustomValidity("");
        }
    }

    if (firstNameInput) {
        firstNameInput.addEventListener("input", () => validateTextInput(firstNameInput));
    }

    if (lastNameInput) {
        lastNameInput.addEventListener("input", () => validateTextInput(lastNameInput));
    }

    // Validate email format
    if (emailInput) {
        emailInput.addEventListener("input", () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.setCustomValidity("Enter a valid email address.");
            } else {
                emailInput.setCustomValidity("");
            }
        });
    }

    // Validate phone number (only numbers and specific length)
    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            const phoneRegex = /^[0-9]{10,15}$/; // Adjust length as needed
            if (!phoneRegex.test(phoneInput.value)) {
                phoneInput.setCustomValidity("Enter a valid phone number (10-15 digits).");
            } else {
                phoneInput.setCustomValidity("");
            }
        });
    }

    // Prevent form submission if there are validation errors
    if (form) {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                alert("Please correct the errors before submitting.");
            }
        });
    }
});
