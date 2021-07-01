let books = require("../../Books");
const { default: slugify } = require("slugify");

exports.bookfetch = (req, res) => {
    res.json(books);
}

// ****************** DELETE ******************

exports.deleteBook = (req, res) => {
    const { bookId } = req.params; // getting id
    const foundBook = books.find(book => book.id === +bookId); // check if book is there
    console.log(foundBook);

    if (foundBook) {
        books = books.filter(books => books.id !== foundBook.id); // delete the book
        console.log(books);
        res.status(204).end(); // No content
    } else {
        res.status(404).json({ message: "Book Not Found" });
    }

}

// ****************** CREATE ******************

exports.createBook = (req, res) => {

    const id = books.length + 1;
    const slug = slugify(req.body.name, { lower: true });
    const newBook = {
        id,
        slug,
        ...req.body,
    };
    books.push(newBook);
    res.status(201).json(newBook);
}

// ****************** UPDATE ******************

exports.updateBook = (req, res) => {

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
}