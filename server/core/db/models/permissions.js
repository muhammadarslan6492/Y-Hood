module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('permission', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
  });
  return Permission;
};
