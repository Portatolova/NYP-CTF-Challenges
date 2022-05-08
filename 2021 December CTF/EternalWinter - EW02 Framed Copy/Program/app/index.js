/**
 * Simple NodeJS Express app
 */
const express = require('express');

const app = express();
const PORT = process.env.PORT || "8000";

app.get("/", (req, res) => {

    if (req.headers["sec-fetch-dest"] === "iframe") {
        return res.sendFile(`${__dirname}/index2.html`);
    } else {
        return res.sendFile(`${__dirname}/index1.html`);
    }
});

app.use(express.static('static'))

app.listen(PORT);