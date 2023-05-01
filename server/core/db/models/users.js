const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return () => this.getDataValue('password');
      },
    },
    dob: {
      type: DataTypes.DATE,
      unique: false,
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['male', 'female', 'other']],
      },
    },
    otp_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('salt');
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  // eslint-disable-next-line
  User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
  };
  // eslint-disable-next-line
  User.encryptPassword = function (plainText, salt) {
    return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
  };
  // eslint-disable-next-line
  User.validPassword = function (user, enteredPassword) {
    return User.encryptPassword(enteredPassword, user.salt()) === user.password();
  };
  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      // eslint-disable-next-line
      user.salt = User.generateSalt();
      // eslint-disable-next-line
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };
  // eslint-disable-next-line
  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);
  return User;
};
