import express from "express";
import Dog from '../models/Dog.js';

const dog = express.Router();

dog.get('/', (req, res) => {
    res.send('Rota de Dogs');
});

dog.post("/register", async (req, res) => {
    
    const { name, breed, size, description, cidade, telefone } = req.body;

    const alreadyExistsDog = await Dog.findOne({ where: { name } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsDog) {
        return res.status(409).json({ message: "Dog already registered!" });
    }

    const newDog = new Dog({ name, breed, size, description, cidade, telefone });
    const savedDog = await newDog.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the dog" });
    });

    if (savedDog) res.json({ message: "New Dog Registered!" });
});

dog.get('/find', async (req, res) => {
    const dogs = await Dog.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (dogs){
        return res.json({dogs})
    } else {
        return null
    }
})

dog.post('/findAdvanced', async (req, res) => {

    const { breed } = req.body;

    const dogs = await Dog.findAll({where: {breed}}).catch(
        (err) => {
            console.log(err)
        }
    );

    if (dogs){
        return res.json({dogs})
    } else {
        return null
    }
})

dog.post('/edit', async (req, res) => {

    const { id, name, breed, size, description, cidade, telefone } = req.body;

    const dog = await Dog.update({ name, breed, size, description, cidade, telefone }, {
        where: {
          id: id
        }
      });

    if (dog){
        return res.json({dog})
    } else {
        return null
    }
})

export default dog;