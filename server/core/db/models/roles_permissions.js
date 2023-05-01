module.exports = (sequelize, DataTypes) => {
  const RolesPermission = sequelize.define('roles_permission', {
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
    permission_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'permissions',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    is_active: DataTypes.BOOLEAN,
  });
  RolesPermission.associate = function (models) {
    // associations can be defined here
    RolesPermission.belongsTo(models.permission, {
      foreignKey: 'permission_id',
    });
    RolesPermission.belongsTo(models.role, {
      foreignKey: 'role_id',
    });
  };
  return RolesPermission;
};
