module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
        },
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
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
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('user_roles');
  },
};
