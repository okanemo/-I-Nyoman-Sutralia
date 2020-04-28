'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    createdBy: DataTypes.BIGINT,
    updatedBy: DataTypes.BIGINT,
    isGoogle: DataTypes.BOOLEAN,
    password: DataTypes.STRING
  });

  Users.associate = (models) => {
    models.Users.hasOne(models.Previllage)
  }

  return Users;
};