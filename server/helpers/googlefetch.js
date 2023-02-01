import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const { GOOGLEAPIKEY } = process.env;

const nearbyURL =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const detailsURL = "https://maps.googleapis.com/maps/api/place/details/json";

async function getNearbyPlaces(latitude, longitude, type, radius) {
    let apiParams = { params: {} };
    apiParams.params["location"] = `${latitude},${longitude}`;
    apiParams.params["type"] = type;
    apiParams.params["radius"] = radius;
    apiParams.params["responseType"] = "application/json";
    apiParams.params["language"] = "en";
    apiParams.params["key"] = GOOGLEAPIKEY;

    const results = await axios
        .get(nearbyURL, apiParams)
        .then((res) => res.data);
    return results;
}

async function getNearbyNext(pageToken) {
    let apiParams = { params: {} };
    apiParams.params["pagetoken"] = pageToken;
    apiParams.params["key"] = GOOGLEAPIKEY;

    const results = await axios
        .get(nearbyURL, apiParams)
        .then((res) => res.data);

    return results;
}

async function getDetails(place_id, fields) {
    let apiParams = { params: {} };
    apiParams.params["place_id"] = place_id;
    apiParams.params["fields"] = fields;
    apiParams.params["key"] = GOOGLEAPIKEY;

    return axios.get(detailsURL, apiParams);
}

export { getNearbyPlaces, getNearbyNext, getDetails };
