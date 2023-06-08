import { Sequelize } from "sequelize";
import connection from '../config/db.js';

const Dog = connection.define(
    'dog',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        breed: {
            type: Sequelize.STRING,
            allowNull: false
        },
        size: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vaccinated: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        castrated: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cidade: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
)

export default Dog;