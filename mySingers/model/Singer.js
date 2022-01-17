
const mongoose = require('mongoose');

let Singer = new mongoose.Schema(
    {
        name: String, 
        age: Number, 
        songName: String,
        year: Number
    },
    {
        strict: false
    }
);


const SingerModel = mongoose.model("Singer", Singer);

module.exports = SingerModel;