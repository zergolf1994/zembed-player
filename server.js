"use strict";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const http = require("http");
const fs = require("fs-extra");
const app = express();

// Global
global.dir = __dirname;

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.set("view engine", "ejs");

app.use(express.static(path.join(global.dir, "public")));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.options("*", (req, res, next) => res.end());

app.use(require("./routes"));

const server = http.createServer(app);

server.listen(process.env.HTTP_PORT, () =>
  console.log(`HTTP port:${process.env.HTTP_PORT}...`)
);

const key = fs.readFileSync("Cert/main.key"),
  cert = fs.readFileSync("Cert/main.cert"),
  options = { key: key, cert: cert };

const server_https = require("https").createServer(options, app);
server_https.listen(process.env.HTTPS_PORT, () =>
  console.log(`HTTPS port:${process.env.HTTPS_PORT}...`)
);
