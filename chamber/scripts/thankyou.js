const thankyou = document.querySelector("#thankyou");
const timestamp = new(Date);

// Grab the entire URL for this page including the attached GET values
const currentUrl = window.location.href;
console.log(currentUrl);

// Divide the url into two halves
const everything=currentUrl.split('?');
// console.log(everything);

// Grab just the second half [1]
// Break the form name-value pairs into an array
let formData = everything[1].split("&");
// console.log(formData);

function show(info) {
    // console.log(info);
    formData.forEach((element) => {
        // console.log(element);
        if (element.startsWith(info)) {
            // console.log("Found a Match");
            result=element.split('=')[1].replace("%40","@").replace("+"," ");
            // === Long version === //
            // result=element.split('=');
            // result=result[1];
            // result=result.replace("%40","@");
            // console.log(result);
            // result = element.split("=")[1].replace("%40", "@").replaceAll("%3A", ":").replaceAll("+", " ").replaceAll("%28", "(").replaceAll("%29", ")");
        }
    });
    return (result);
}

function thanksData () {
    thankyou.innerHTML = `
        <h1>YOUR APPLICATION HAS BEEN RECEIVED</h1>
        <p>Thank you for applying for Membership Level: ${show("level")}</p>
        <p>Name: ${show("firstname")} ${show("lastname")}</p>
        <p>Your Phone: ${show("mobile")}</p>
        <p>Your Email: <a href="${show("email")}"> ${show("email")}</a></p>
        <p>Business/Organization: ${show("orgname")}</p>
        <p>Submitted on:</p>
        <p>${timestamp}</p>
        `
};

console.log("Going to execute thanksData() function")
thanksData();