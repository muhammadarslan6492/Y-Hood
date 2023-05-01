module.exports = (sequelize, DataTypes) => {
  const UserHobby = sequelize.define('user_hobby', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    hobby_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Hobbies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });
  UserHobby.associate = function (models) {
    // associations can be defined here
    UserHobby.belongsTo(models.user, {
      foreignKey: 'user_id',
    });
    UserHobby.belongsTo(models.hobby, {
      foreignKey: 'hobbies_id',
    });
  };
  return UserHobby;
};
