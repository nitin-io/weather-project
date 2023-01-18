const time = document.getElementById("digital-clock");
const date = document.getElementById("digital-calender")

setInterval(() => {
    let currentTime = new Date();

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    time.innerHTML = currentTime.toLocaleTimeString('en-US', optionsTime)
   
    const options = {
        weekday: 'long',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    }
    date.innerHTML = currentTime.toLocaleDateString('en-US', options);
}, 1000);
