
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bookroutes = require("./API/book/routes");
const db = require("./db/models/index");


// ****************** MIDDLEWARE ******************
app.use(cors());
app.use(bodyParser.json());


// ****************** ROUTES ******************
app.use("/books", bookroutes)

const run = async () => {
    try {
        await db.sequelize.sync();
        console.log("Connection to the database successful!");
        await app.listen(8000, () => {
            console.log("The application is running on localhost:8000");
        });
    } catch (error) {
        console.error("Error connecting to the database: ", error);
    }
};

run();

