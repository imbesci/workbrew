import axios from "axios";
import express from "express";
import cors from "cors";
import { locationRouter } from "./routes/location.js";

const app = express();
const PORT = 8000;

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile("./html_files/index.html", { root: __dirname });
});

app.use("/location", locationRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
