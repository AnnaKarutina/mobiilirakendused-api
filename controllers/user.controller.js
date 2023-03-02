const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.getProfile = (req, res) => {
    console.log(req.userId)
    User.findOne({
        where: {
            id: req.userId
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                roles: authorities,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        });
    })
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

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};