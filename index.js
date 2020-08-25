var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./routers/index");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/", router);
app.use(express.json());
app.listen(process.env.PORT || 8081, function () {
  console.log("server running on port 8081!");
});
