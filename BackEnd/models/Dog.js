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
            allowNull: false
        }
    }
)

export default Dog;