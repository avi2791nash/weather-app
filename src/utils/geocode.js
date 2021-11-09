const request = require('request');

const geoCode = (address, callback) => {
  const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibHVjaWZlcjI3IiwiYSI6ImNrdTU2OGZ0bjA0bXIyb283OHB6NzF1eWsifQ.VVcOnXZkAWY__vPL0mIzTQ&limit=1';

  request({url, json: true}, (error, {body}) => {

    if (error) {
      callback('Unable to Retrieve Location Information', undefined);
      //console.log('Unable to Retrieve Location Information');
    } else if (body.message) {
      callback('Weather Information Not Found. Try another search.', undefined);
      //console.log('Weather Information Not Found. Try another search.')
    } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name
        });
      /*const geoData = res.body;
      var long = 0;
      var lat = 0;
      const features = geoData.features
      features.forEach((feature) => {
        long = feature.center[0];
        lat = feature.center[1];
        console.log(long);
        console.log(lat);
      });*/
    }
  })
}


module.exports = geoCode
