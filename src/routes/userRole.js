const {
    router,
    userRole,
    auth
} = require('./import-module')

router.post('/user-role', (req, res) => {
    return userRole.create(req.body)
    .then(result => res.json(result))
})

router.get('/user-role', auth.authorize(['admin']) ,(req, res) => {
    return userRole.getAll()
    .then(result => res.json(result))
})

router.get('/user-role/:id', auth.authorize(['admin']), (req, res) => {
    return userRole.getById(req.params.id || null)
    .then(result => res.json(result))
})

router.patch('/user-role/:id', auth.authorize(['admin']), (req, res) => {
    return userRole.update(req.params.id || null, req.body)
    .then(result => res.json(result))
})

module.exports = router