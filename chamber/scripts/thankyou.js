const thankyou = document.querySelector("#thankyou");
const timestamp = new Date(); // Fix the Date initialization

// Grab the entire URL for this page including the attached GET values
const currentUrl = window.location.href;
console.log(currentUrl);

// Divide the URL into two halves based on '?'
const everything = currentUrl.split('?');

// Grab just the second half [1] if available
let formData = everything[1] ? everything[1].split("&") : [];

// Function to extract form data values
function show(info) {
    let result = ''; // Declare the result variable
    formData.forEach((element) => {
        if (element.startsWith(info)) {
            result = element.split('=')[1].replace("%40", "@").replace("+", " ");
        }
    });
    return result;
}

function thanksData() {
    // Populate the thankyou section with form data
    thankyou.innerHTML = `
        <h1>Member Information:</h1>
        <p>Thank you for applying for Membership Level: ${show("membership")}</p>
        <p>Name: ${show("first")} ${show("last")}</p>
        <p>Your Phone: ${show("phone")}</p>
        <p>Your Email: <a href="mailto:${show("email")}">${show("email")}</a></p>
        <p>Business/Organization: ${show("org")}</p>
        <p>Submitted on: ${timestamp}</p>
    `;
}

// Execute the thanksData function
thanksData();
