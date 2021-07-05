const SequelizeSlugify = require("sequelize-slugify");

const BookModel = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        name: { type: DataTypes.STRING, allowNull: false },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        image: { type: DataTypes.STRING },
        brief: { type: DataTypes.STRING },
    });
    SequelizeSlugify.slugifyModel(Book, { source: ["name"] });
    return Book;
};

module.exports = BookModel;