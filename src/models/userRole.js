'use strict';

module.exports = (sequelize, DataTypes) => {
    var Previllage = sequelize.define('Previllage', {
        userId: DataTypes.BIGINT,
        roleId: DataTypes.BIGINT,
        createdBy: DataTypes.BIGINT,
        updatedBy: DataTypes.BIGINT
    }, {
        tableName: 'user_role'
    })

    Previllage.associate = (models) => {
        models.Previllage.belongsTo(models.Users)
        models.Previllage.belongsTo(models.Roles)
    }
    return Previllage
}