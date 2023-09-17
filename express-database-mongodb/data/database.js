const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
  //로컬에 있는 mongodb 서버에 연결
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  //blog 인스턴스를 만든다.
  database = client.db("blog");
}

function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
