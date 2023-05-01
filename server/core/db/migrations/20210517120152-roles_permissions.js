module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles_permissions', {
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
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'permissions',
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
    await queryInterface.dropTable('roles_permissions');
  },
};
