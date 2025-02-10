const apiKey = '5570be89a2607b030a8d37b0'; // Replace with your API key
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/JPY`; // Replace with your API endpoint

// Function to fetch exchange rates
function fetchExchangeRates() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const jpyToUsd = data.conversion_rates.USD;
                const jpyToEur = data.conversion_rates.EUR;

                const usdToYen = (1 / jpyToUsd).toFixed(2);
                const eurToYen = (1 / jpyToEur).toFixed(2);

                document.getElementById('usd-to-yen').textContent = `1 USD = ¥${usdToYen}`;
                document.getElementById('eur-to-yen').textContent = `1 EUR = ¥${eurToYen}`;
            } else {
                console.error('Error fetching exchange rates:', data.error);
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('usd-to-yen').textContent = 'Error loading rate';
            document.getElementById('eur-to-yen').textContent = 'Error loading rate';
        });
}

// Update time function
function updateTime() {
    const currentTime = new Date().toLocaleString();
    document.getElementById('current-time').innerHTML = `Current Time in Tokyo: ${currentTime}`;
}

// Ensure the exchange script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchExchangeRates();
    setInterval(fetchExchangeRates, 60000);
    setInterval(updateTime, 1000);
});
