const { Book, Shop } = require("../../../db/models");

// ****************** GET THE BOOK BY ID ******************
exports.fetchBook = async (bookId, next) => {
    try {
        const book = await Book.findByPk(bookId);
        return book;
    } catch (error) {
        next(error)
    }

};

// ****************** FETCH BOOK ******************
exports.bookfetch = async (req, res, next) => {
    try {
        const books = await Book.findAll({
            attributes: { exclude: ["shopId", "createdAt", "updatedAt"] },
            include: {
                model: Shop,
                as: "shop",
                attributes: ["name"],
            },
        });
        res.json(books);
    } catch (error) {
        next(error);
    }

}

// ****************** DELETE ******************

exports.deleteBook = async (req, res, next) => {
    try {
        await req.book.destroy();
        res.status(204).end(); // No content

    } catch (error) {
        next(error);
    }
}

// ****************** UPDATE ******************

exports.updateBook = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = `http://${req.get("host")}/${req.file.path}`;
        }
        const updatedBook = await req.book.update(req.body);
        res.json(updatedBook);
    } catch (error) {
        next(error);
    }
};