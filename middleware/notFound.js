const notFound = async (err, req, res, next) => {
    res.status(400).json({
        msg: 'Route does not exist'
});
}

module.exports = notFound