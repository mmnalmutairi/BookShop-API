
const BookModel = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        name: { type: DataTypes.STRING },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        image: { type: DataTypes.STRING },
        brief: { type: DataTypes.STRING },
    });
    return Book;
};

module.exports = BookModel;