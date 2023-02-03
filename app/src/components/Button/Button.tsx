import * as React from "react";
import { useState } from "react";
import "./Button.css";
import { imageDownloader, speedTest, formatNumber} from "../../helpers/speedtest"
import { NearbyTable, Restaurant } from "../NearbyTable/NearbyTable"

interface Props {
    buttonType: string;
  }

export const Button = (props: Props) => {
  const [clicked, setClicked] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [speed, setSpeed] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

    
    const onClick = async (val: string) => {
        // Button click handling for location:
        if (val === "location") {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
            setClicked(true);
            fetch("http://localhost:8000/location/shops", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ latitude, longitude })})
            .then((response) => response.json())
            .then((data) => {
            setResponseData(data.data);
            setIsLoading(false);
        });})}

        // Button click handling for wifi speed test:
        if (val === "networkTest") {
            const internetSpeed = await speedTest()
            setSpeed(internetSpeed)
            setClicked(true)
           
    };}

    if (props.buttonType === "location") {
        return (
          <div>
            <div className="tableContainer">
              {!isLoading && clicked && (
                <NearbyTable restaurants={responseData} />
              )}
            </div>
            <div className="buttonContainer">
              {!clicked && !isLoading && (
                <button className="clickButton" onClick={() => onClick("location")}>
                  Click it!
                </button>
              )}
              {isLoading && (
                <div>Loading...</div>
              )}
            </div>
          </div>
        );
      }

    if (props.buttonType === "networkTest") {
        return (
            <div className="buttonContainer">
            <button className="clickButton" onClick={() => onClick("networkTest")}>
                {!clicked ? "Click to perform a network test!" : isLoading ? "Performing speed test..." : "Your approximate internet speed is: "+formatNumber(speed)+" kB/s"}
            </button>
            </div>
        );}

    return null
};