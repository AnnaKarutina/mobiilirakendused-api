module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("services", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        subtitle: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.FLOAT
        },
        image: {
            type: Sequelize.STRING
        },
        currency: {
            type: Sequelize.STRING(3)
        },
        category: {
            type: Sequelize.INTEGER
        },
        owner: {
            type: Sequelize.STRING
        },
    });

    return Service;
};