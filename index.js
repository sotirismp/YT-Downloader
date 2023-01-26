const express = require("express");
const yt = require("yt-converter");
const app = express();
var router = express.Router();

const cors = require("cors");
var InfoRoute = require("./Routes/InfoRoute");
var DownloadRoute = require("./Routes/DownloadRoute");
const { ReadDatabase, WriteDatabase } = require("./Database/Database");

app.use(express.json());
app.use(cors());
app.use(router);

app.use(express.static("public"));
app.use("/info", InfoRoute);
app.use("/download", DownloadRoute);

app.listen("3000", () => {
  console.log("server is running in port 3000");
});
