const express = require("express");
const router = express.Router();
const { default: slugify } = require("slugify");
const { bookfetch, deleteBook, createBook, updateBook } = require("./controllers");
let books = require("../../Books");


router.get("/", bookfetch);

// ****************** DELETE ******************
router.delete("/:bookName", deleteBook);


// ****************** CREATE ******************
router.post("/", createBook);


// ****************** UPDATE ******************

router.put("/:bookId", updateBook);

module.exports = router;