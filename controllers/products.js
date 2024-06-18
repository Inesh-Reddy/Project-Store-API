const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const search = 'ab';
    const Products = await Product.find({
        name : { $regex : search, $options : 'i'}
    });
    res.status(200).json({
        Products,
        nbHits : Products.length
    })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {};
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = { $regex: name , $options: 'i'}    
    }
    const Products = await Product.find(queryObject);

    res.status(200).json({
        Products,
        nbHits : Products.length
    })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}
