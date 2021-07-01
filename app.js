
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bookroutes = require("./API/book/routes");

// ****************** MIDDLEWARE ******************
app.use(cors());
app.use(bodyParser.json());


// ****************** ROUTES ******************
app.use("/books", bookroutes)
app.listen(8000, () => {
    console.log("The  application is running on localhost:8000");
});

