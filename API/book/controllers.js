const { default: slugify } = require("slugify");
const { Book } = require("../../db/models")

exports.bookfetch = async (req, res) => {
    // const books = await Book.findAll();
    // console.log(books);
    const books = await Book.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.json(books);
}

// ****************** DELETE ******************

exports.deleteBook = async (req, res) => {
    const { bookId } = req.params; // getting id
    const foundBook = await Book.findByPk(bookId);
    // const foundBook = books.find(book => book.id === +bookId); // check if book is there
    try {
        if (foundBook) {
            await foundBook.destroy();
            res.status(204).end(); // No content
            // books = books.filter(books => books.id !== foundBook.id); // delete the book
            // console.log(books);

        } else {
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// ****************** CREATE ******************

exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // const id = books.length + 1;
    // const slug = slugify(req.body.name, { lower: true });

}

// ****************** UPDATE ******************

exports.updateBook = async (req, res) => {

    const { bookId } = req.params; // getting id
    // const foundBook = books.find((book) => book.id === +bookId); // check if book is there
    try {
        const foundBook = await Book.findByPk(bookId);
        if (foundBook) {
            // for (const key in req.body) {
            //     foundBook[key] = req.body[key];
            //     // foundBook.slug = slugify(req.body.name, { lower: true });
            // }
            await foundBook.update(req.body);
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Book Is not Updated" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}