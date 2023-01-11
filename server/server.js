require("dotenv").config({ path: "./config.env" });
const app = require("./index");
const mongoose = require("mongoose");
const axios = require('axios');
const responseTime = require('response-time');
const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((error) => console.log(error));

app.use(responseTime());

app.listen(8080, () => console.log("server is runnning at port 8080!"));


