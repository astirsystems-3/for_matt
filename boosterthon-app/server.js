/** Express router providing user related routes
 * @module Server_REST_API
 * @requires express
 * @description HTTP Request Request Routing for Articles Collection
 */

// PULL in Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");


/**
 * RESTAPI Server Instance
 * @description exported for Unit Testing
 * @member
 */
const app = express();


/**
 * CORS Origin URL
 * @member
 * @type {string}
 * @description URL where HTTP Requests can originate from can also be an ARRAY
 */
const corsOriginURL = "http://localhost:8081";
const corsOptions = {
  origin: corsOriginURL,
};

// Attach Express Middlewares
  app.use(cors(corsOptions));
  // parse requests of content-type - application/json
  app.use(express.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

/**
 * Database Instance
 */
const db = require("./app/models");

// Log Database URL
// console.log(db.url);

// Polling Test..
setInterval(()=>{
    console.log("test");
},1000)

// INIT DATABASE
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



// Serve ReactJS App
app.get("/", (req, res) => {
  res.json({ message: "Welcome to boosterthon application." });
});

// attach sub Routes
require("./app/routes/article.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/**
 * export for Unit Tests..
 */
exports.app = app;
