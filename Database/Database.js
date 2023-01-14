const fs = require("fs");
const DATABASE_FILE = "./Database/Database.json";

const ReadDatabase = () => {
  let database = [];
  if (fs.existsSync(DATABASE_FILE)) {
    database = JSON.parse(fs.readFileSync(DATABASE_FILE, { encoding: "utf8" }));
  }
  return database;
};

const WriteDatabase = (db) => {
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(db), "utf8");
};

module.exports = {
  ReadDatabase,
  WriteDatabase,
};
