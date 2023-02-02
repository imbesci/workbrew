import * as React from "react";
import { useState } from "react";
import "./Button.css";
import { imageDownloader, speedTest } from "../../helpers/speedtest"

interface Props {
    buttonType: string;
  }

export const Button = (props: Props) => {
  const [clicked, setClicked] = useState(true);
  const [responseData, setResponseData] = useState("");
  const [speed, setSpeed] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

    
    const onClick = async (val: string) => {
        // Button click handling for location:
        if (val === "location") {
            setClicked(!clicked);
            fetch("http://localhost:8000")
            .then((response) => response.json())
            .then((data) => {
            setResponseData(data.message);
            setIsLoading(false);
        });}

        // Button click handling for wifi speed test:
        if (val === "networkTest") {
            const internetSpeed = await speedTest()
            setSpeed(internetSpeed)
           
    };}

    if (props.buttonType === "location") {
        return (
            <div className="buttonContainer">
            <button className="clickButton" onClick={() => onClick("location")}>
                {clicked ? "Click it!" : isLoading ? "Loading..." : responseData}
            </button>
            </div>
        );}

    if (props.buttonType === "networkTest") {
        return (
            <div className="buttonContainer">
            <button className="clickButton" onClick={() => onClick("networkTest")}>
                {clicked ? "Click to perform a network test!" : isLoading ? "Performing speed test..." : "Your approximate internet speed is: "+speed.toString()+"kB/s"}
            </button>
            </div>
        );}

    return null
};