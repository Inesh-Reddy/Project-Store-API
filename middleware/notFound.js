const notFound = (err, req, res, next) => {
    res.status(400).send('Route does not exist');
}

module.exports = notFound