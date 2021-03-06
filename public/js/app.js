const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

//messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value
  console.log(location)
  messageOne.textContent = 'Fetching Weather'
  messageTwo.textContent = ''

  fetch('/weather?address=' + location).then((response) => {
    messageOne.textContent = ''
    messageTwo.textContent = ''
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = 'Please provide a valid location';
      } else {
        messageTwo.textContent = 'Weather: ' + data.forecast.weather_descriptions[0] + ' and the current Temperature is ' + data.forecast.temperature +
         ' , it Feels Like: ' + data.forecast.feelslike + ' and Humidity: ' + data.forecast.humidity;
        messageOne.textContent = 'Location: ' + data.location;

      }
    });
  });
})
