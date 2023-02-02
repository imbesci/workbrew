import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import {
    getNearbyPlaces,
    getNearbyNext,
    getDetails,
} from "../helpers/googlefetch.js";

//setup location/ router
const locationRouter = express.Router();

// parse application/x-www-form-urlencoded
locationRouter.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
locationRouter.use(bodyParser.json());

//POST REQUESTS
locationRouter.post("/shops", async (req, res) => {
    const { latitude, longitude } = req.body;

    console.log(latitude, longitude);
    //Ensure we have a latitude and longitude provided in request
    if (!latitude || !longitude) {
        res.status(400).json({
            data: "location data was not provided properly",
        });
        return;
    }
    //Fetch initial dataset from PlacesAPI
    let placesData = await getNearbyPlaces(latitude, longitude, "cafe", 50000);
    const pageToken = placesData["next_page_token"];
    placesData = placesData["results"];

    //If there is a next_page_token, fetch it
    if (pageToken) {
        const nextPage = await getNearbyNext(pageToken);
        placesData.push(...nextPage["results"]);
    }

    const detailsFields =
        "name,place_id,formatted_address,current_opening_hours,website,rating";

    //Fetch extended details about all nearby places
    const detailsData = await Promise.all(
        placesData.map((place) => getDetails(place["place_id"], detailsFields))
    ).then(
        axios.spread((...allData) => {
            const cleaned_data = allData.map((obj) => obj.data);
            return cleaned_data;
        })
    );

    //Create output array
    const data = [];
    for (let place of detailsData) {
        //Get index of array that has the data.
        const index = placesData.findIndex(
            (data) => data["place_id"] === place["result"]["place_id"]
        );

        //Make sure status for the fetch as OK
        if (place["status"] === "OK") {
            let { geometry, plus_code, scope, photos, vicinity, ...cleaned } =
                placesData[index];
            data.push({ ...cleaned, ...place["result"] });
        }
    }

    res.status(200).json({ data: data });
});

//GET requests
locationRouter.get("/shops", (req, res) => {
    res.send("location/shops");
});

export { locationRouter };
