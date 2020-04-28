'use strict';

module.exports = (sequelize, DataTypes) => {
    var Roles = sequelize.define('Roles', {
        name: DataTypes.STRING,
        createdBy: DataTypes.BIGINT,
        updatedBy: DataTypes.BIGINT
    })

    Roles.associate = (models) => {
        models.Roles.hasOne(models.Previllage)
    }

    return Roles
}