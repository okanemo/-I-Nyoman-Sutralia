const {
    models
} = require('./import-module')

const getAll = () => {
    return models.Previllage.findAll()
}

const create = (data) => {
    return models.Previllage.create(data)
}

const getById = (id) => {
    return models.Previllage.findOne({
        where: {
            userId: id
        }
    })
}
const update = (id, data) => {
    console.log(data)
    return models.Previllage.update(data, {
        where: {
            id: id
        }
    })
}

module.exports = {
    getAll,
    create,
    getById,
    update
}