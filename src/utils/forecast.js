const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=75705489780321d85cf30803b5b8ba3b&query='+ latitude + ',' + longitude;

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the Weather forecast services.', undefined);
        } else if(response.body.error) {
            callback('Unable to find the given coordinates. Search another coordinates.', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weather_desc: response.body.current.weather_descriptions[0],
                humidity: response.body.current.humidity
            });
        }
    });
};

module.exports = forecast;