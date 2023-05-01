module.exports = (sequelize, DataTypes) => {
  const Hobby = sequelize.define('hobby', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  });
  return Hobby;
};
