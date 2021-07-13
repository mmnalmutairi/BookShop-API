const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");
const { shopFetch, createShop, createBook, fetchShop } = require("./controllers");



// ****************** SHOP LIST ******************
router.get("/", shopFetch);


// ****************** MULTER ******************
const storage = multer.diskStorage({
    destination: "./media",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
});
const upload = multer({ storage });


// ****************** Middleware Param ******************
router.param("shopId", async (req, res, next, shopId) => {
    const shop = await fetchShop(shopId, next);
    if (shop) {
        req.shop = shop;
        next();
    } else {
        const error = new Error("Shop Not Found");
        error.status = 404;
        next(error);
    }
});


// ****************** CREATE SHOP ******************
router.post("/", passport.authenticate("jwt", { session: false }), upload.single("image"), createShop);


// ****************** CREATE BOOK INSIDE SHOP ******************
router.post("/:shopId/books", passport.authenticate("jwt", { session: false }), upload.single("image"), createBook);

module.exports = router;