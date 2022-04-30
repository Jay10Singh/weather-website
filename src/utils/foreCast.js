import request from "request";

const foreCast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e2cb952bd10244fb26fc9579eb637d0f&query=' + longitude + ',' + latitude + '&units=f';

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather stack api', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}.It is currently ${body.current.temperature} degree out. But it feels like ${body.current.feelslike} degrees out. The Humidity is ${body.current.humidity} %`);
        }
    })

}

export default foreCast;