let state = document.getElementById("status");
document.getElementById("location").onclick = run;
const key = "AIzaSyA5TnniqdlSEQqjsRDXKlgpUDuW-nIPs4U";
const geo_url = "https://maps.googleapis.com/maps/api/geocode/json?";
const nearby_url =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

//Handle old versions
if (!navigator.permissions) {
    state.innerHTML = "Unable to detect browser permissions";
}

async function run() {
    const location = await getCurrentLocation();
    state.innerHTML = location.str;
    //Early return if we dont have the location data
    if (!location.found) {
        return null;
    }
    const { latitude, longitude } = location;
    const data = { latitude: latitude, longitude: longitude };
    fetchsresults = await fetch("http://127.0.0.1:8000/location/shops", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    console.log(fetchsresults);
}

async function getCurrentLocation() {
    const result = await navigator.permissions.query({ name: "geolocation" });
    if (result.state === "granted" || result.state === "prompt") {
        try {
            const position = await requestPosition();
            if (position.coords) {v
                return {
                    found: true,
                    str: `Found - latitude: ${position.coords.latitude} | longitude: ${position.coords.longitude}`,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
            } else {
                return {
                    found: false,
                    str: "Geolocation is not supported by this browser.",
                    latitude: null,
                    longitude: null,
                };
            }
        } catch (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    return {
                        found: false,
                        str: "User denied the request for Geolocation.",
                        latitude: null,
                        longitude: null,
                    };
                case error.POSITION_UNAVAILABLE:
                    return {
                        found: false,
                        str: "Location information is unavailable.",
                        latitude: null,
                        longitude: null,
                    };
                case error.TIMEOUT:
                    return {
                        found: false,
                        str: "The request to get user location timed out.",
                        latitude: null,
                        longitude: null,
                    };
                case error.UNKNOWN_ERROR:
                    return {
                        found: false,
                        str: "An unknown error occurred.",
                        latitude: null,
                        longitude: null,
                    };
            }
        }
    } else {
        return {
            found: false,
            str: "Geolocation is not enabled or supported",
            latitude: null,
            longitude: null,
        };
    }
}

function requestPosition() {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );
    } else {
        return new Promise((resolve) => resolve({}));
    }
}
