const { models, paginationHelper } = require('./import-module')

const getAll = (params) => {
    let param = paginationHelper(params)
    param.include = [
        {
            model: models.Previllage,
            include: {
                model: models.Roles
            }
        }
    ]

    return models.Users.findAll(param)
}

const getById = (id) => {
    return models.Users.findOne({
        where: {
            id: id
        },
        include: {
            model: models.Previllage,
            include: {
                model: models.Roles
            }
        }
    })
}

const updateName = (data, id) => {
    return models.Users.update({
        username: data.username
    }, {
        where: {
            id: id
        }
    })
}
module.exports = {
    getAll,
    getById,
    updateName
}