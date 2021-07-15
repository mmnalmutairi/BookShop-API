const { Shop, Book } = require("../../../db/models");

// ****************** GET THE SHOP BY ID ******************
exports.fetchShop = async (shopId, next) => {
    try {
        const shop = await Shop.findByPk(shopId);
        return shop;
    } catch (error) {
        next(error);
    }
};


// ****************** FETCH SHOP ******************
exports.shopFetch = async (req, res, next) => {
    try {
        const shops = await Shop.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
                model: Book,
                as: "books",
                attributes: ["name", "image", "brief"],
            },
        });
        res.json(shops);
    } catch (error) {
        next(error);
    }

};


// ****************** CREATING BOOK ******************
exports.createBook = async (req, res, next) => {
    try {
        if (req.user.id === req.shop.userId) {
            if (req.file) {
                req.body.image = `http://${req.get("host")}/${req.file.path}`;
            }
            req.body.shopId = req.shop.id;
            const newBook = await Book.create(req.body);
            res.status(201).json(newBook);
        } else {
            const err = new Error("Unauthorized !");
            err.status = 400;
            return next(err);
        }
    } catch (error) {
        next(error);
    }

};

// ****************** CREATING SHOP ******************
exports.createShop = async (req, res, next) => {
    try {
        const foundShop = await Shop.findOne({
            where: { userId: req.user.id }
        })
        if (foundShop) {
            const err = new Error("You already have a shop!!");
            err.status = 400;
            return next(err);
        }
        if (req.file) {
            req.body.image = `http://${req.get("host")}/${req.file.path}`;
        }
        req.body.userId = req.user.id;
        const newShop = await Shop.create(req.body);
        res.status(201).json(newShop);
    } catch (error) {
        next(error);
    }

};

