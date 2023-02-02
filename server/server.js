import axios from "axios";
import express from "express";
import cors from "cors";
import { locationRouter } from "./routes/location.js";
const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send({"message": "You got this message from the server", "status": 200});
});

app.use("/location", locationRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
