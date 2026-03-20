const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db("schoolDB");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };