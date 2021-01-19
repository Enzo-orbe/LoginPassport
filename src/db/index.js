const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB connect");
  } catch (error) {
    console.log(error);
    process.exit(1); //Stop the app
  }
};

module.exports = connectDB;
