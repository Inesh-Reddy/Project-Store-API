const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const search = 'a';
    const Products = await Product.find({
        name : { $regex : search, $options : 'i'},
        price: { $gt : 30 }
    }).sort('price').select('name price').limit(100).skip(0);
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

    const page = Number(req.query.page) || 1;
    const limit  = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);


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
