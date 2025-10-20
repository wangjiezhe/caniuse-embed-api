/* **************************************

   CanIUse Embed Screenshot

************************************** */

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

import getFeatureList from "./modules/get-feature-list.js";
import getMDNBrowserCompatData from "./modules/get-mdn-browser-compat-data.js";

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the CanIUse Embed API!");
});

app.get("/features", async (req, res) => {
    const features = await getFeatureList();
    res.status(200).json(features);
});

app.post("/mdn-browser-compat-data", async (req, res) => {
    try {
        const feature = req && req.body && req.body.feature;
        const data = await getMDNBrowserCompatData(feature);
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status("500").json(err);
    }
});

const server = app.listen(app.get('port'));
server.on('listening', () => {
    console.log("app running on port", server.address().port);
});
