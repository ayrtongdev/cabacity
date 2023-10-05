const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());


const MONGODB_URI = 'mongodb://127.0.0.1:27017/Cabacity'; 
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to MongoDB");
});


const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    pais: String,
    estado: String,
    cidade: String,
    motivo: String
});

const User = mongoose.model('Usuario', userSchema);


app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
