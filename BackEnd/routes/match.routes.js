import express from "express";
import Match from '../models/Match.js';
import Dog from '../models/Dog.js';
import User from "../models/User.js";

const match = express.Router();

match.get('/', (req, res) => {
    res.send('Rota de Matchs');
});

match.post("/register", async (req, res) => {

    const { idUser, idDog, comment, stars } = req.body;

    const alreadyExistsMatch = await Match.findOne({ where: { idUser, idDog } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsMatch) {
        return res.status(409).json({ message: "Match already registered!" });
    }

    const newMatch = new Match({ idUser, idDog, comment, stars });
    const savedMatch = await newMatch.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the Match" });
    });

    if (savedMatch) res.json({ message: "New Match Registered!" });
});

match.get('/findByDog', async (req, res) => {
    const idDog = req.query.idDog;
    const matchs = await Match.findAll({
        where: {
            idDog: idDog
        },
        include: [{ model: User }]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (matchs) {
        return res.json({ matchs })
    } else {
        return null
    }
})

match.get('/findByUser', async (req, res) => {
    const idUser = req.query.idUser;
    const matchs = await Match.findAll({
        where: {
            idUser: idUser
        },
        include: [{ model: Dog }]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (matchs) {
        return res.json({ matchs })
    } else {
        return null
    }
})

export default match;