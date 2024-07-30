
const request = require('request');

const geocode = (address, callback) => {
    const geocodeUrl = "https://api.mapbox.com/search/geocode/v6/forward?q=" + address + "&proximity=ip&access_token=pk.eyJ1IjoiYWxhZGF3aTk3IiwiYSI6ImNseXQ2cjZiMzBhMDcycW9ueDZiN3ByOTEifQ.rbvvaZQk1kWj5s49N_E12w";

    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect geocode service", undefined);
        } else if (response.body.message) {
            callback(response.body.message, undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to find location", undefined);
        } else {
            

            const feature = response.body.features[0];
            if (feature && feature.geometry && feature.geometry.coordinates) {
                callback(undefined, {
                    longtitude: feature.geometry.coordinates[0],
                    latitude: feature.geometry.coordinates[1]
                });
            } else {
                callback("Unable to find location coordinates", undefined);
            }
        }
    });
}

module.exports = geocode;

