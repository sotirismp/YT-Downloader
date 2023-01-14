const yt = require("yt-converter");

const DownloadSong = async (id, filename) => {
  return new Promise((res, rej) => {
    yt.convertAudio(
      {
        url: `https://www.youtube.com/watch?v=${id}`,
        itag: 140,
        directoryDownload: __dirname + `/songs/${id}`,
        title: filename,
      },
      () => {},
      (err) => {
        res("done");
      }
    );
  });
};

module.exports = {
  DownloadSong,
};
