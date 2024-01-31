const fs = require('fs')
const bcrypt = require('bcrypt')
const path = require('path');
const {Service, Order, Review, User} = require('../models/models')
const {Sequelize} = require('sequelize')


class adminController{
    async serviceGet( req, res){
        let services = await Service.findAll();
        return res.json(services);
    }

    async serviceGetOne(req, res){
        const {id} = req.params
        
        const service = await Service.findOne(
            {
                where: {id}
            },
        )
        return res.json(service)
    }

    async serviceUpdate(req, res){
        var { name, price} = req.query;
        const {id} = req.params

        const existingservice = await Service.findOne({where: {id}});

        existingservice.name = name;
        existingservice.price = price;

        await existingservice.save();
        return res.json(existingservice);

    }

    async serviceDelete(req, res){
        const {id} = req.params
        var service = Service.destroy({where:{id}});
        return res.json(service);
    }

    async serviceCreate(req, res){
        let {name, price} = req.query

        const service = await Service.create({name, price});

        return res.json(service)
    }

    
    async userGet(req, res){
        var users = await User.findAll()

        return res.json(users)
    }

    async userGetOne(req, res){
        const {id} = req.params
        
        const user = await User.findOne(
            {
                where: {id}
            },
        )
        return res.json(user)
    }

    async userUpdate(req, res){
        const { email, password } = req.query;
        console.log(req)
        const {id} = req.params
        const userToUpdate = await User.findOne({
            where: {id}
        });
        var hashPassword
        if (password) {
            hashPassword = await bcrypt.hash(password, 5)
        }

        if (email) userToUpdate.email = email;
        if (password) userToUpdate.password = hashPassword;

        await userToUpdate.save();

        return res.json(userToUpdate)
    }

    async userDelete(req, res){
        const {id} = req.params
        var user = User.destroy({where:{id}});
        return res.json(user);
    }

    async userCreate(req, res){
        const { email, password } = req.query;
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await User.create({
        email: email,
        password: hashPassword,
        });

        return res.json(newUser)
    }

    
    async ordersGet(req, res){
        var orders = await Order.findAll()

        return res.json(orders)
    }

    async ordersGetOne(req, res){
        const {id} = req.params
        
        const order = await Order.findOne(
            {
                where: {id}
            },
        )
        return res.json(order)
    }

    async ordersUpdate(req, res){
        const {id} = req.params
        const {userId, date, serviceId} = req.query;

        const orderToUpdate = await Order.findOne(
            {
                where: {id}
            },
        )

        if (userId) orderToUpdate.userId = userId;
        if (serviceId) orderToUpdate.serviceId = serviceId;
        if (date) orderToUpdate.date = date;

        await orderToUpdate.save();

        return res.json(orderToUpdate)
    }

    async ordersDelete(req, res){
        const {id} = req.params
        var order = Order.destroy({where:{id}});
        return res.json(order);
    }

    async ordersCreate(req, res){
        const { userId, date, serviceId } = req.query;

        const neworder = await Order.create({
            userId, serviceId, date
        });
        return res.json(neworder);
    }
    
    async reviewsGet(req, res){
        var reviews = await Review.findAll()
        return res.json(reviews)
    }

    async reviewsGetOne(req, res){
        const {id} = req.params
        
        const review = await Review.findOne(
            {
                where: {id}
            },
        )
        return res.json(review)
    }

    async reviewsUpdate(req, res){
        const {id} = req.params; 
        const reviewToUpdate = await Review.findOne(
            {
                where: {id}
            },
        )

        const { text, rate, date , userId} = req.query;
        
        

        if (text) reviewToUpdate.text = text;
        if (rate) reviewToUpdate.rate = rate;
        if (date) reviewToUpdate.date = date;
        if (userId) reviewToUpdate.userId = userId;

        await reviewToUpdate.save();
        return res.json(reviewToUpdate)
    }

    async reviewsDelete(req, res){
        const {id} = req.params
        var review = Review.destroy({where:{id}});
        return res.json(review);
    }

    async reviewsCreate(req, res){
        const { text, rate, date, userId } = req.query;

        const newReview = await Review.create({
        text: text,
        rate: rate,
        date: date,
        userId: userId,
        });

        return res.json(newReview)
    }
}

module.exports = new adminController()