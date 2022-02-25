const mongoosse = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoosse.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
