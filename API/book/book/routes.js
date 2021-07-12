const express = require("express");
const { bookfetch, deleteBook, updateBook, fetchBook } = require("./controllers");
const router = express.Router();
const multer = require("multer");



// ****************** BOOK LIST ******************
router.get("/", bookfetch);


// ****************** MULTER ******************
const storage = multer.diskStorage({
    destination: "./media",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
});
const upload = multer({ storage });



// ****************** Middleware Param ******************
router.param("bookId", async (req, res, next, bookId) => {
    const book = await fetchBook(bookId, next);
    if (book) {
        req.book = book;
        next();
    } else {
        const error = new Error("Book Not Found");
        error.status = 404;
        next(error);
    }
});



// ****************** DELETE ******************
router.delete("/:bookId", deleteBook);


// ****************** UPDATE ******************

router.put("/:bookId", upload.single("image"), updateBook);

module.exports = router;