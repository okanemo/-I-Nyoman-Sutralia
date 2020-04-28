const {
    router,
    users,
    auth
} = require('./import-module')

router.get('/users', auth.authorize(['admin']), (req, res) => {
    return users.getAll()
    .then(user => {
        res.json(user)
    })
})

router.get('/users/:id', auth.authorize(['admin']), (req, res) => {
    return users.getById(req.params.id || null)
    .then(user => res.json(user))
})

router.get('/user/get-profile', auth.authorize(['owner'], 'Users'), (req, res) => {
    return users.getById(req.user.userId)
    .then(result => res.json(result))
})

router.patch('/update-profile', auth.authorize(['owner'], 'Users'), (req, res) => {
    return users.updateName(req.body, req.user.userId)
    .then(result => res.json(result))
})

module.exports = router