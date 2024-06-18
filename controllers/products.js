const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
    const Products = await Product.find({featured: true});
    res.status(200).json({
        Products,
        nbHits : Products.length
    })
}


const getAllProducts = async (req, res) => {
    
    res.status(200).json({
        msg: "products route"
    })
}


module.exports = {
    getAllProductsStatic,
    getAllProducts
}
