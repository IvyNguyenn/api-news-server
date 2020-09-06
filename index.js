var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./routers/index");
var cors = require("cors");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/", router);
app.use(express.json());

// pass CORS
app.use((req, res, next) => {
  res.header("Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE"
  );
  req.header("Access-Control-Allow-Origin", "*");

  next();
});
app.use(cors());

app.listen(process.env.PORT || 8081, function () {
  console.log("server running on port 8081!");
});
