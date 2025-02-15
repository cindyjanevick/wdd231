document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded!"); // Debugging
    console.log(document.body.innerHTML); // Check if the element is there

    const thankYouMessageContainer = document.getElementById('thank-you-message');

    if (!thankYouMessageContainer) {
        console.error("❌ Element with ID 'thank-you-message' not found! Check if it's in the HTML.");
        return; // Stop execution if not found
    }

    console.log("✅ Found #thank-you-message! Injecting content...");

    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('first-name') || "Guest";
    const lastName = urlParams.get('last-name') || "";
    const email = urlParams.get('email') || "Not provided";
    const phone = urlParams.get('phone') || "Not provided";
    const message = urlParams.get('message') || "No message provided";
    const tourName = urlParams.get('tour-name') || "Not selected";
    const tourDate = urlParams.get('tour-date') || "Not selected";

    const thankYouMessage = document.createElement('div');
    thankYouMessage.innerHTML = `
        <h2>Thank You, ${firstName} ${lastName}!</h2>
        <p>Your inquiry has been submitted successfully. Here's what we received:</p>
        <ul>
            <li><strong>Tour:</strong> ${tourName}</li>
            <li><strong>Desired Tour Date:</strong> ${tourDate}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>We will contact you shortly.</p>
    `;

    thankYouMessageContainer.appendChild(thankYouMessage);
});
