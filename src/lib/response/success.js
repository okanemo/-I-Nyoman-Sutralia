const response = (result) => {
    return (req, res, next) => {
        console.log
        res.json(result)
    }
}

module.exports = response