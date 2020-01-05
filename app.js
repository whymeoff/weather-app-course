const request = require('request');

const url ='https://api.darksky.net/forecast/dfb1959ef03093d51e4ceb772c6bb154/47.8267,35.4233?units=si&lang=en';
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Zaporozhye.json?access_token=pk.eyJ1IjoiZW1hcmN1cyIsImEiOiJjazUxY2NobGcwYTh1M29wbHUwdWFyNjEzIn0.S_hGqq8gbljHN4duIx1-eA'

request.get({ url, json: true }, (err, res) => {
    if (err) {
        console.log('Unable to connect to weather service!')
    } else if (res.body.error){
        console.log(res.body.error);
    } else {
        console.log(`${res.body.daily.data[0].summary} It is currently ${res.body.currently.temperature} degrees out. There is a ${res.body.currently.precipProbability}% chance of rain.` );
    }
});

request.get({ url: geocodeURL, json: true }, (err, res) => {
    if (err) {
        console.log('Unable to connect to geolocation services!');
    } else if (res.body.features.length === 0) {
        console.log('Can`t find this place!');
    } else {
        console.log(`Longtittude: ${res.body.features[0].center[0]}, Lattitude: ${res.body.features[0].center[1]} `)

    }
});