const request = require('request');

const forecast = (latitude, longitude, callback) => {
    // const latitude = coordinates.latitude;
    // const longitude = coordinates.longitude;
    const url = `http://api.weatherstack.com/current?access_key=a6d2d62b94da7045b1054e5c9ceb6980&query=${latitude},${longitude}&units=m`;

    request({ url: url, json: true}, (err, response) => {
        if(err) {
            callback('Unable to connect to the weather services!', undefined);
        } else if(response.body.error) {
            callback('Unable to find the location', undefined);
        } else {
            const { body } = response;
            const res = `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out and feels like ${response.body.current.feelslike} degrees. There is a ${response.body.current.precip}% chance of rain`;
            const weatherIcon = response.body.current.weather_icons[0];
            const foreCastData = {res, weatherIcon};
            callback(undefined, foreCastData);
        }
    });
};

module.exports = forecast;