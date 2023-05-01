module.exports = (sequelize, DataTypes) => {
  const AuthenticationToken = sequelize.define('authenticationToken', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
      },
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  AuthenticationToken.associate = models => {
    // AuthenticationToken users associations
    AuthenticationToken.belongsTo(models.user, {
      foreignKey: 'userId',
    });
    models.user.hasMany(AuthenticationToken, {
      foreignKey: 'userId',
    });
  };

  return AuthenticationToken;
};
