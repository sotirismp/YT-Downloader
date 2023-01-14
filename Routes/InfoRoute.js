var express = require("express");
const fs = require("fs");
const axios = require("axios");
const ytdl = require("ytdl-core");
const { ReadDatabase, WriteDatabase } = require("../Database/Database");

var router = express.Router();

const getIdFromString = (text) => {
  try {
    if (!text) return null;
    if (!text.split(`"`)[0]) return null;

    return text.split(`"`)[0];
  } catch {
    return null;
  }
};

router.get("/:q", async (req, res) => {
  try {
    const database = ReadDatabase();

    const q = req.params.q;
    console.log(q);

    const response = await axios.get(
      "https://www.youtube.com/results?search_query=" + q
    );
    const ids = [];
    for (let i = 1; i < 100; i++) {
      const id = getIdFromString(
        response.data.split(`"videoId":"`)[i].split(`"`)[0]
      );
      if (id) {
        if (!ids.includes(id)) ids.push(id);

        if (ids.length === 3) break;
      }
    }

    const items = [];
    for (let i = 0; i < ids.length; i++) {
      let item = database.find((item) => item.id === ids[i]);
      if (item) {
        items.push(item);
      } else {
        const url = `https://www.youtube.com/watch?v=${ids[i]}`;
        const info = await ytdl.getBasicInfo(ids[i]);
        const { likes, dislikes } = (
          await axios.get(
            `https://returnyoutubedislikeapi.com/votes?videoId=${ids[i]}`
          )
        ).data;
        const title = info.videoDetails.title;
        const thumbnail = info.videoDetails.thumbnails[0].url;
        const views = info.videoDetails.viewCount;
        const published = info.videoDetails.publishDate;
        const lengthSeconds = info.videoDetails.lengthSeconds;

        item = {
          id: ids[i],
          url,
          title,
          views,
          lengthSeconds,
          likes,
          dislikes,
          published,
          thumbnail,
          queryCreated: Date.now(),
        };
        database.push(item);
        items.push(item);
      }
    }

    WriteDatabase(database);
    return res.json(items);
  } catch {}
});

module.exports = router;
