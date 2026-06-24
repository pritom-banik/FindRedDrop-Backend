require('dotenv').config();

const express = require("express")
const cors = require('cors');
const PORT = process.env.PORT || 5002
const database = require("./config/database");
const Welcome = require('./extras/welcome');

const app = express()
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(Welcome());
})


database.connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Welcome to IdeaVault at port ${PORT}`);
    });
});