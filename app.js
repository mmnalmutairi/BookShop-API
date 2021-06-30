
const express = require("express");
const cors = require("cors");

let books = require("./Books");
let Books = require("./Books");
const bodyParser = require("body-parser");
const { default: slugify } = require("slugify");
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get("/books", (req, res) => {
    res.json(books);
});



// ****************** DELETE ******************
app.delete("/books/:bookName", (req, res) => {
    const { bookName } = req.params; // getting id
    const foundBook = books.find(book => book.name != bookName); // check if book is there
    console.log(foundBook);

    if (foundBook) {
        books.filter(books => books.name !== bookName); // delete the book
        res.status(204).end(); // No content
    } else {
        res.status(404).json({ message: "Book Not Found" });
    }

});


// ****************** CREATE ******************
app.post("/books", (req, res) => {

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



// ****************** UPDATE ******************

app.put("/books/:bookId", (req, res) => {

    const { bookId } = req.params; // getting id

    const foundBook = books.find((book) => book.id === +bookId); // check if book is there

    if (foundBook) {
        for (const key in req.body) {

            foundBook[key] = req.body[key];

            // foundBook.slug = slugify(req.body.name, { lower: true });
        }

        res.status(204).json().end();
    } else {
        res.status(404).json({ message: "Book Is not Updated" });
    }
});



app.listen(8000, () => {
    console.log("The  application is running on localhost:8000");
});

