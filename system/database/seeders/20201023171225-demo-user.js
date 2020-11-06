'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      email: 'truongdinhthien260599@gmail.com',
      password: 'abcd1234',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};