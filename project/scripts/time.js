function updateTime() {
    const tokyoTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });
    document.getElementById('current-time').innerHTML = `Current Time in Tokyo: ${tokyoTime}`;
}

setInterval(updateTime, 1000); // Update every second
