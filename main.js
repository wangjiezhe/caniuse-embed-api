/* **************************************

   CanIUse Embed Screenshot

************************************** */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const getFeatureList = require("./modules/get-feature-list");
const getMDNBrowserCompatData = require("./modules/get-mdn-browser-compat-data");

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

const server = app.listen(app.get('port'), function () {
    console.log("app running on port.", server.address().port);
});
