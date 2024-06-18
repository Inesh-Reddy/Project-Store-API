const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const search = 'ab';
    const Products = await Product.find({
        name : { $regex : search, $options : 'i'}
    }).sort('-name');
    res.status(200).json({
        Products,
        nbHits : Products.length
    })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort} = req.query;
    // const { sort } = req.query
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
    // const Products = await Product.find(queryObject).sort();
    let result = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt')
    }
    const Products = await result;
    

    res.status(200).json({
        Products,
        nbHits : Products.length
    })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}
