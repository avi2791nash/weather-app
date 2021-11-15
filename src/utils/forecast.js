const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=311ba2018511df7000d3732fd82457ca&query=' + latitude + ',' + longitude + '=&units=f';

  request({url, json: true}, (error, {body}) => {
    //const data = JSON.parse(response.body);
    //console.log(response.body.current);
  //console.log(response);
    if (error) {
      callback('Unable to Retrieve Weather Information', undefined);
    } else if (body.error) {
      callback('Unable to find Location', undefined);
    } else {
      callback(undefined,  body.current);

      /*callback(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out. It feels like '
      + response.body.current.feelslike + ' degrees out.');*/
    }

  });
};

module.exports = forecast
