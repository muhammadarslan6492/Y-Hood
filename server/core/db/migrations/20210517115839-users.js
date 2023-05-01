module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salt: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
        unique: false,
      },
      gender: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['male', 'female', 'other']],
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      otp_verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      email_verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
