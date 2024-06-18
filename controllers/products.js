const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const Products = await Product.find({featured: true});
    res.status(200).json({
        Products,
        nbHits : Products.length
    })
}

const getAllProducts = async (req, res) => {
    const Products = await Product.find(req.query);

    res.status(200).json({
        Products,
        nbHits : Products.length
    })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}
