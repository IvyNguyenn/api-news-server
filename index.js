var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./routers/index");
var cors = require("cors");

// pass CORS
const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:8081",
    "https://localhost:8080",
    "https://localhost:8081",
    "https://book-ecommerce.web.app/",
    "https://book-ecommerce.firebaseapp.com/",
    "*",
  ], // reqexp will match all prefixes
  // default: "http://localhost:9999",
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS,PUT",
  credentials: true, // required to pass
  // allowedHeaders:
  // "Content-Type, Authorization, Content-Language, Accept-Language, Last-Event-ID, X-Requested-With"
};
app.use(cors(corsOptions));

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

// pass CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE"
//   );
//   req.header("Access-Control-Allow-Origin", "*");

//   next();
// });
