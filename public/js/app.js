console.log("app.js loaded successfully!!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location)
    .then((response) => {
    response.json()
        .then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = `${data.weather_desc}. It is currently ${data.temperature}°C and feelslike ${data.feelslike}°C here.`;
            }
        });
    
    });
});



