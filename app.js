require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db/connect');

app.use(express.json());

const productsRouter = require('./routes/products')
const notFoundMiddleware = require('./middleware/notFound');
const errorMiddleware = require('./middleware/errorHandler');

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="api/v1/products">Products Route</a>')
})

app.use('/api/v1/products',productsRouter );

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        // DB connection
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening on port : ${port} ...`)
        })
    } catch (e) {
        console.log('error');
    }
}

start();