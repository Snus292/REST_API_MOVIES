'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      release_year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      run_time: { 
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.FLOAT
      },
      meta_score: {
        type: Sequelize.FLOAT
      },
      votes: {
        type: Sequelize.INTEGER
      },
      gross: {
        type: Sequelize.FLOAT
      },
      directorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Directors', // Убедитесь, что эта таблица существует
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};
