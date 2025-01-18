const hamburgerElement = document.querySelector('#myButton'); // TODO
// const navElement = document.querySelector('.menuLinks'); //
const navElement = document.querySelector('#animateme'); // TODO

const membersURL = 'data/members.json';
const cards = document.querySelector('#cards');
  
console.log("Going to GET business data");
getBusinessData();

async function getBusinessData() {
    const response = await fetch(membersURL);
    if (response.ok) {
        const data = await response.json();
        console.log("AWAITING RESPONSE data");
        console.table(data.companies);

        if (spotlight == true) {
            let newList = createGoldSilverArray(data.companies);
            console.table(newList);
            let randList = create3RandomBusinesses(newList);
            displayBusinesses(randList);
        } else {
            displayBusinesses(data.companies);
        };
    };
}   

const displayBusinesses = (companies) => {
    console.log("Going to DISPLAY business data");
    console.table(companies);
    console.log(`Current grid choise is: ${gridChoice}`);

	// cards defined at top of this file
	cards.innerHTML = "";
    
    companies.forEach((company) => {
        // console.table(company);
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let level = document.createElement('p');
        let address = document.createElement('p');
        let web = document.createElement('p');
        let phone = document.createElement('p');
        let logo = document.createElement('img');
          
        // Build the h2 content out to show company name and level
        h2.innerHTML = `${company.name}`;
        h2.setAttribute("class", "buss_name");
        if (company.memberLevel == 3) {
            level.innerHTML = `Gold Level - &#x2605&#x2605&#x2605`;
        } 
            else if (company.memberLevel == 2) {
            level.innerHTML = `Silver Level - &#x2605&#x2605`;           
        }
            else if (company.memberLevel == 1) {
            level.innerHTML = `Member - &#x2605`
            }
        address.innerHTML = `${company.address}`;
        address.setAttribute("class", "addr");
        web.innerHTML = `${company.url}`;
        web.setAttribute("class", "web_url");
        phone.innerHTML = `${company.phoneNumber}`;
        phone.setAttribute("class", "phone");
        // Build the logo image 
        logo.setAttribute('src', company.imageurl);
        logo.setAttribute('alt', `logo of ${company.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '140');
        logo.setAttribute('height', '140');
  
        // Append the section(card) with the created elements
        card.appendChild(h2);
        card.appendChild(level);  
        card.appendChild(address);  
        card.appendChild(web);  
        card.appendChild(phone);  
        card.appendChild(logo);
    
        cards.appendChild(card);
    }); // end of arrow function and forEach loop
  }

// Shortened names for EventListeners
const gridButton = document.querySelector('#select_grid');
const listButton = document.querySelector('#select_list');

let gridChoice = "grid";
console.log("SETTING DEFAULT: grid mode");

function createGoldSilverArray(companies) {
    console.log("Going to create GoldSilver array");

    let goldSilver = [];
    companies.forEach((company) => {
        if (company.memberLevel>1)
            goldSilver.push(company);
    });
    console.log(goldSilver);
    return goldSilver;
};

function create3RandomBusinesses(array) {
    // Using Fisher-Yates shuffle algorithm for unique random values
    let businesses = [];

    for (let i = array.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    businesses = array.slice(0,3);
    return businesses;
}

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

let spotlight = false;

let yr = new Date().getFullYear();
let lastModified = document.lastModified;
let author = "Misawa City";
let place = "Chamber of Commerce";

// \u00A9 is the unicode for the copywrite symbol
// backticks allow us to insert variables into the output.
document.getElementById("copywrite").innerHTML = `\u00A9 ${yr} ${author} ${place}`;
document.getElementById("lastModified").innerHTML = `Last Modified: ${lastModified}`;