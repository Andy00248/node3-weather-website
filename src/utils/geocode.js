const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWFiaXNoeTA1IiwiYSI6ImNrYWt2bWEyYjA0NnAyeHF3MGNsYmM1ODgifQ.dzmLQBgriHcdC9qso9M2jg&limit=1";

    request({ url : url, json: true}, (err, response) => {
        if(err) {
            callback('Unable to connect to location services!', undefined);
        } else if(response.body.features.length===0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { features } = response.body;
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name,
            });
        }
    });
};

module.exports = geocode;

