const {
    router
} = require('./import-module')
const authentication = require('./authentication')
const users = require('./users')
const userRole = require('./userRole')
const roles = require('./Roles')


router.get('/', (req, res) => {
    res.json({
        message: 'Server running sunccessfully',
        version: require('../../package.json').version
    })
})
router.post('/authentication', authentication)
router.use('/', users)
router.use('/', userRole)
router.use('/', roles)


module.exports = router