import request from "request";

// Geocoding

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoiYmhhdHJoaGRmZiIsImEiOiJjbDAyajJvangxNGd0M2p0MWFiaXdqNDYwIn0.glPwhp5vqKfDhMJJNdi9oA&limit=1';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect with the Location services');
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try with another search', undefined);
        }
        else {
            callback(undefined, {
                longitude: response.body.features[0].center[1],
                latitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

export default geoCode;