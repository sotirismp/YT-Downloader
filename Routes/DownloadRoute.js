var express = require("express");
var router = express.Router();
const yt = require("yt-converter");
const fs = require("fs");
const { DownloadSong } = require("../DownloadSong");
const { ReadDatabase, WriteDatabase } = require("../Database/Database");

const DATABASE_FILE = "./database.json";
const SONGS_FOLDER = "./songs/";

router.get("/:id", async (req, res) => {
  try {
    const database = ReadDatabase();

    const id = req.params.id;
    console.log(id);
    if (id === "") return res.status(500).send("Video ID must NOT be empty");
    const item = database.find((item) => item.id === id);
    if (!item) return res.status(500).send("first search the song");

    if (!fs.existsSync(SONGS_FOLDER)) {
      fs.mkdirSync(SONGS_FOLDER);
    }

    if (item?.filename)
      res.download(`${SONGS_FOLDER}${id}/${item.filename}.mp3`, () => {});

    fs.mkdirSync(SONGS_FOLDER + id);
    const title = item.title;
    var filename = title.replace(/([^a-zα-ωάέήίόύώ0-9-— ]+)/gi, "");

    const message = await DownloadSong(id, filename);

    database.find((item) => {
      if (item.id === id) {
        item.filename = filename;
        item.fileCreated = Date.now();
        return;
      }
    });
    WriteDatabase(database);
    res.download(`${SONGS_FOLDER}${id}/${filename}.mp3`, () => {});
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
