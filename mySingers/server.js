const express = require('express');

const mongoose = require('mongoose');

const singer = require('./public/script');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/singer', singer);
app.use(express.static("public"))

mongoose.connect('mongodb://localhost:27017/Songs', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));