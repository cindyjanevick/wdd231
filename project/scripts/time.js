// Time script
function updateTime() {
    const currentTime = new Date().toLocaleString();
    document.getElementById('current-time').innerHTML = `Current Time in Tokyo: ${currentTime}`;
}

setInterval(updateTime, 1000); // Update every second
