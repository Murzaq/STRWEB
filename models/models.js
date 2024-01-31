const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING}
})

const Service = sequelize.define('service',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},
    price: {type: DataTypes.FLOAT,}
})

const Order = sequelize.define('order',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type:DataTypes.TEXT},
    rate: {type:DataTypes.INTEGER},
    date: {type:DataTypes.DATE},
})


User.hasMany(Review)
Review.belongsTo(User)

Service.hasMany(Order)
Order.belongsTo(Service)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
    User,
    Order,
    Service,
    Review,
}




