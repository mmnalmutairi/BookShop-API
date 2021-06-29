
const { request, response } = require("express");
const express = require("express");
const cors = require("cors");

let books = require("./Books");
const app = express();

app.use(cors());

app.get("/Books", (req, res) => {
    res.json(books);
});

app.delete("/Books/:bookName", (req, res) => {
    const { bookName } = req.params; // getting id
    const foundBook = books.find(book => book.name != bookName); // check if book is there

    if (foundBook) {
        books.filter(books => books.name !== bookName); // delete the book
        res.status(204).end(); // No content
    } else {
        res.status(404).json({ message: "Book Not Found" });
    }

});

app.listen(8000, () => {
    console.log("The  application is running on localhost:8000");
});

