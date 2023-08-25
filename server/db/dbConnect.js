const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connection successfull on ", connect.connection.host);
  } catch (error) {
    console.log(error);
  }
};
