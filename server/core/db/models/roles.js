module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
  });
  return Role;
};
