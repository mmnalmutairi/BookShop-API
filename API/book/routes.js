const express = require("express");
const { bookfetch, deleteBook, createBook, updateBook } = require("./controllers");
const router = express.Router();


router.get("/", bookfetch);

// ****************** DELETE ******************
router.delete("/:bookId", deleteBook);


// ****************** CREATE ******************
router.post("/", createBook);


// ****************** UPDATE ******************

router.put("/:bookId", updateBook);

module.exports = router;