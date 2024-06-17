const errorHandler = async (err, req, res, next) => {
    return res.status(400).json({
        msg: "Something went wrong please try again"
    })
}

module.exports = errorHandler