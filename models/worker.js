const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = sequelize.define('worker', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    unique: true
  },

  // composite unique key
  uniqueOne: {type: Sequelize.INTEGER, unique: 'compIdx'},
  uniqueTwo: {type: Sequelize.INTEGER, unique: 'compIdx'},

  employmentDate: {
    type: Sequelize.DATE, 
    field: 'employment_date', 
    validate: {      
      isAfter: '2010-01-01',
      isBefore: '2015-01-01'
    }
  },

  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },

  salary: {
    type: Sequelize.DECIMAL(7,2),
    validate: {
      insideSalaryRange(value) {
        if (value < 0 || value > 10000) {
          throw new Error('Salary validation error');
        }
      }
    }
  }
},
{
  modelName: 'worker',

  // nie tworza sie updatedAt oraz createdAt
  timestamps: false,

  // nie tworzy sie tylko createdAt
  // createdAt: false,

  // updatedAt ma od teraz nazwe updateTimestamp
  // updatedAt: 'updateTimestamp'

  // nazwa tabeli
  tableName: 'workers',
  
  // optimistic locking
  // version: true,
});