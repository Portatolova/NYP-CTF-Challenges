/**
 * Simple NodeJS Express app
 */
const express = require('express');

const app = express();
const PORT = process.env.PORT || "8000";

app.get("/jewel", (req, res) => {
    res.setHeader("jewel", "NYP{j3w3l_1s_s0_c00L_l1k3_0mg}");
    res.sendFile(`${__dirname}/jewel.html`);
});

app.use(express.static('static'))

app.listen(PORT);