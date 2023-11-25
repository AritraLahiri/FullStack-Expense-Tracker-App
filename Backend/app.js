const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const userRoute = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/user", userRoute);

sequelize
  .sync()
  .then((res) => {
    // console.log(res);
  })
  .catch((err) => console.log(err));

app.listen(3000);
