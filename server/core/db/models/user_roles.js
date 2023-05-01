module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('user_role', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'roles',
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
    is_active: DataTypes.BOOLEAN,
  });
  UserRole.associate = function (models) {
    // associations can be defined here
    UserRole.belongsTo(models.user, {
      foreignKey: 'user_id',
    });
    UserRole.belongsTo(models.role, {
      foreignKey: 'role_id',
    });
  };
  return UserRole;
};
