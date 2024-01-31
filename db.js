const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'web',
    'postgres',
    'postgres',
    {
        dialect:"postgres",
        host: 'localhost',
        port: 6401 
    }
)