module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authenticationTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      value: {
        type: Sequelize.STRING(1000),
      },
      userId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
        },
      },
      expireAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('authenticationTokens');
  },
};
