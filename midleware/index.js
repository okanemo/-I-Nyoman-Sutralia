const auth = require('../src/services/auth')
module.exports = (req, res, next) => {
    // console.log(req.headers.authorization)
    res.on('finish', () => {
        // console.log(req)
        console.info(`${req.method} ${req.url} :${res.statusCode} ${res.statusMessage}`)
    })
    return auth.jwtValidation(req.headers.authorization || null)
    .then(result => {
        req.user = result
        next()
    })
    // next()
}