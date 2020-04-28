const {
    router,
    auth
} = require('./import-module')


router.post('/authentication', (req, res, next) => {
    return auth.authenticate(req.body)
    .then(result => res.json(result)) 
    .catch(next)
})

module.exports = router