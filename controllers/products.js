const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const search = 'ab';
    const Products = await Product.find({
        name : { $regex : search, $options : 'i'}
    }).sort('-name').select('name company');
    res.status(200).json({
        Products,
        nbHits : Products.length
    })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields} = req.query;

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
    
    let result = Product.find(queryObject)

    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
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
