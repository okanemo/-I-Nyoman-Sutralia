const {
    models
} = require('./import-module')

const getAll = () => {
    return models.Roles.findAll()
}

const getById = (id) => {
    return models.Roles.findOne({
        where: {
            id: id
        }
    })
}

const create = (data) => {
    return models.Roles.create(data)
}

module.exports = {
    getAll,
    getById,
    create
}