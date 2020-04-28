const {
    router,
    roles,
    auth
} = require('./import-module')

router.post('/roles', auth.authorize(['admin'], 'Roles'), (req, res) => {
    return roles.create(req.body)
    .then(result => res.json(result))
})

router.get('/roles/:id',auth.authorize(['admin'], 'Roles'),(req, res) => {
    return roles.getById(req.params.id)
    .then(result => res.json(result))
})

router.get('/roles', auth.authorize(['admin'], 'Roles'), (req, res) => {
    return roles.getAll()
    .then(result => res.json(result))
})

module.exports = router