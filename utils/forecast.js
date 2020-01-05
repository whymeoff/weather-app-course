const request = require('request');

const forecast = (lat, long, callback) => {
    const url =`https://api.darksky.net/forecast/dfb1959ef03093d51e4ceb772c6bb154/${lat},${long}?units=si&lang=en&limit=1`;

    request.get({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (res.body.error){
            callback('Unable to find this location.', undefined);
        } else {
            callback('', {
                maxTemp: res.body.daily.data[0].temperatureHigh, 
                temp: res.body.currently.temperature, 
                precipProbability: res.body.daily.data[0].precipProbability
            });
        }
    })
}

module.exports = forecast;