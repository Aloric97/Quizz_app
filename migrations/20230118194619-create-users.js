'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      firstName:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false,
        validate:{
            is: /^[a-z0-9]+$/i,
            len: [3,25]
        }
      },
      lastName:{
          type: Sequelize.DataTypes.STRING,
          allowNull:false,
          validate:{
              is: /^[a-z0-9]+$/i,
              len: [3,25]
          }
      },
      email:{
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull:false,
          validate:{
              isEmail:true,
              len: [8,50]
          }
      
      },
      password:{
          type: Sequelize.DataTypes.STRING,
          allowNull:false,
          validate:{
              len: [8,250]
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
    await queryInterface.dropTable('Users');
  }
};