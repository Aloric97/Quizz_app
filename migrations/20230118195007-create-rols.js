'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rols', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name:{
          type: Sequelize.DataTypes.STRING,
          validate:{
              is: /^[a-z0-9]+$/i,
              len: [8,25]
          }
      },
      description:{
          type: Sequelize.DataTypes.TEXT,
          validate:{
              len: [3,300]
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rols');
  }
};