const express = require("express");
const routes = require("./route.js");

const app = express();
app.use(express.json());

app.get("/", (_, res) => res.send("✅ Consumer-Service running"));
routes(app);

module.exports = app;
