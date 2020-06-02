const weatherForm = document.querySelector('form');
const searchAddress = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const icons = document.querySelector('.icons');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = searchAddress.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    icons.src = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                messageOne.textContent = data.error;
                return;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.foreCast.res;
            icons.src = data.foreCast.weatherIcon;
            console.log(data.foreCast, data.location, data.address);
        });
    });
});
