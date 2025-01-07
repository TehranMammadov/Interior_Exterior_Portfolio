const mongoose = require("mongoose");
const  logger = require("../logger/index.js");

mongoose.connection
  .once("connected", () => {
    logger.info("Connected to DB...");
  })
  .on("error", (error) => {
    logger.error(`Error connecting to DB: ${JSON.stringify(error.message)}`);
  })
  .on("disconnected", () => {
    logger.info(`Disconnected from DB...`);
  })
  .on("connecting", () => {
    logger.info(`Connecting to Db...`);
  });

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports= async () => {
  const dbAddress = process.env.MONGO_DB_URL;
  //const dbAddress = process.env.MONGO_DB_URL_TEST;
  // mongoose.set("bufferCommands", false);
  const options = {
    autoCreate: false,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 100, // Maintain up to 100 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  try {
    return await mongoose.connect(dbAddress, options);
  } catch (error) {
    throw error;
  }
};

