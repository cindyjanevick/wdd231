document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    // Get submitted form values
    const firstName = urlParams.get('first-name');
    const lastName = urlParams.get('last-name');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const message = urlParams.get('message');
    const tourName = urlParams.get('tour-name');
    const tourDate = urlParams.get('tour-date'); // Get the desired tour date

    // Create dynamic message container
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

    // Inject the dynamic content into the page
    document.getElementById('thank-you-message').appendChild(thankYouMessage);
});
