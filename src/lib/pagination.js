const paginationHelper = (params) => {
    if (params && params.page && params.limit) {
        return {
            limit: params.limit,
            offset: (params.page -1 ) * params.limit
        }
    }

    return {}
}

module.exports = {
    paginationHelper
}