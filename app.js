
const { request, response } = require("express");
const express = require("express");
const cors = require("cors");

let books = require("./Books");
const bodyParser = require("body-parser");
const { default: slugify } = require("slugify");
const Books = require("./Books");
const app = express();

app.use(cors());
app.use(bodyParser.json());


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

app.post("/Books", (req, res) => {

    const id = Books.length + 1;
    const slug = slugify(req.body.name, { lower: true });
    const newBook = {
        id,
        slug,
        ...req.body,
    };
    Books.push(newBook);
    res.status(201).json(newBook);
})

app.listen(8000, () => {
    console.log("The  application is running on localhost:8000");
});

