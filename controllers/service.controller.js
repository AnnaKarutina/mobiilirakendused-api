const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../models");
const config = require("../config/auth.config");
const uuid = require("uuid");
const Service = db.service;
const User = db.user;
const Role = db.role;

exports.allServices = (req, res) => {
    console.log('get services', req.userId)
    Service.findAll({
        where: {
            owner: req.userId
        }
    })
        .then(services => {
            console.log('service result')
            // console.log(services)
            if (!services) {
                return res.status(404).send({ message: "Services Not found." });
            }
            let results = []
            services.forEach(service => {
                results.push({
                    id: service.id,
                    title: service.title,
                    subtitle: service.subtitle,
                    description: service.description,
                    price: service.price,
                    image: service.image,
                    currency: service.currency,
                    category: service.category,
                    owner: service.owner,
                    createdAt: service.createdAt,
                    updatedAt: service.updatedAt
                })
            })
            console.log(results)
            res.status(200).send(results)
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.addService = (req, res) => {
    console.log('addService ', req.userId)
    // Save Service to Database
    Service.create({
        id: uuid.v4(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        currency: req.body.currency,
        category: req.body.category,
        owner: req.userId
    })
        .then(service => {
            res.status(200).send("Service added succesfully.");
            }
        )
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.editProfile = (req, res) => {
    console.log(req.userId)
    User.update(
        {
            fullName: req.body.fullName,
        },
        {
            where: { id: req.userId }
        }
    )
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            res.status(200).send("OK");
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteService = (req, res) => {
    console.log('userID', req.userId)
    console.log('serviceID', req.servicesId)
    Service.delete(
        {
            where: { id: req.servicesId }
        }
    )
        .then(service => {
            if (!service) {
                return res.status(404).send({ message: "Service Not found." });
            }
            res.status(200).send("OK, deleted");
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};