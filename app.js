
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bookroutes = require("./API/book/book/routes");
const shoproutes = require("./API/book/shop/routes");
const userRoutes = require("./API/user/routes");
const db = require("./db/models/index");
const passport = require("passport");
const { localStrategy } = require("./API/middleware/passport");
// ****************** MIDDLEWARE ******************

// Request ----> Middleware ------> Next() ------> Router/Controller
//         <-------------------------------------- Response  

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);


// ****************** ROUTES ******************
app.use("/books", bookroutes);
app.use("/shops", shoproutes);
app.use(userRoutes);
app.use("/media", express.static("media"));


// ****************** Handling No found Path ******************
app.use((req, res, next) => {

    res.status(404).json({ message: "Path not found " });
});

// ****************** Handling Errors ******************

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || "Enternal Server Error." });
});


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

