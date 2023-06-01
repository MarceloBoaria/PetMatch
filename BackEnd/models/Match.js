import { Sequelize } from "sequelize";
import connection from "../config/db.js";
import Dog from "./Dog.js";
import User from "./User.js";

const Match = connection.define(
    'match',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        idUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        idDog: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'dogs',
                key: 'id'
            }
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stars: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
);

Match.belongsTo(Dog, {
    foreignKey: 'idDog'
});

Match.belongsTo(User, {
    foreignKey: 'idUser'
});

export default Match;