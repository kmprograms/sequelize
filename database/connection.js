const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_seq_db', 'root', 'root', {
    host: 'localhost', 
    port: 3306, 
    dialect: 'mysql',
    pool: {
        max: 20,
        idle: 30000
    },
    logging: false
});

module.exports = sequelize;