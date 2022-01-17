const express = require('express')
const Singer = require('../model/Singer');


const router = express.Router();


router.get('/', (req, res)=>{
 
    Singer.find({}).exec((err, singers) => {
        if (err) console.log(err.message);
        else res.json(singers);
    })
})

router.get('/:name', (req, res)=>{
    Singer.findOne({ name: req.params.name }).exec((err, singer) => {
        if (err || singer === null) {
            res.status(404);
            res.send("Error.. singer was not found!!");
        }
        else {
            res.status(200);
            res.json(singer)
        }
    })
})


router.post('/add', (req, res) => {

    let newSinger = new Singer();
    newSinger.name = req.body.name;
    newSinger.age = req.body.age;
    newSinger.songName = req.body.songName;
    newSinger.year = req.body.year;

    newSinger.save((err,singer )=> {
        if (err){
            res.status(404);
            res.send('Failed saving...');
        }
        else{
            res.status(201);
            res.send('New singer was added successfully');
        }
    });
});


router.put('/update/:name', (req, res) => {

    Singer.findOneAndUpdate(
        { name: req.params.name }, { $set: {year: req.body.newYear} }, 
        (err, updatedSinger) => {
            if(err || updatedSinger === null) {
                res.status(404);
                res.send(`Failed updating year...`);
        }else{
            res.status(200);
            res.send(`The year was updated successfully`);
        }}
    )
})


router.delete('/delete/:name', (req, res)=>{

    Singer.findOneAndDelete({ name: req.params.name })
    .exec((err, singer)=>{
        if(err || singer === null) {
            res.status(404);
            res.send(`Failed deleting singer...`);
        }else{
            res.status(200);
            res.send(`Singer was deleted successfully`);
        }
    })
})


module.exports = router;