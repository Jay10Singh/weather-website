import request from "request";

const foreCast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e2cb952bd10244fb26fc9579eb637d0f&query=' + longitude + ',' + latitude + '&units=f';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather stack api', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}.It is currently ${response.body.current.temperature} degree out. But it feels like ${response.body.current.feelslike} degrees out `);
        }
    })

}

export default foreCast;