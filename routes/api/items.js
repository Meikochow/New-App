const express = require('express');
const router = express.Router();

//Item model
//'../../' dotdotslash - to get outside the api folder 
// 'and the next dotdotslash te get outside the routes folder'
//and the to achess models object
//which got the Item property 
const Item = require('../../models/Item');

//@route   GET api/items
//@desc    Get All Items
//@access  Public

//we add only the slash because if we hit this ('/api/items') endpoint 
//in the http client it's gonna go right 
//to the './routes/api/items' file
// so we dont put '/api/items'
//because we are already in that route
//this '/' - slash represents this '/api/items' actual endpoint since we are using the router
//if we would be in the server.js file then YES we would need to use the'/api/items' end point
//we can use sort since we use mongoose ; sort accepts 1 or -1 , meanign asscending or descending order (in this case date)
router.get('/', (req, res)=>{
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

//@route   POST api/items
//@desc    Create an item
//@access  Public

router.post('/', (req, res)=>{
    const newItem = new Item({
        name:req.body.name
    });

newItem.save()
.then(item => res.json(item));
});

//@route   DELETE api/items/:id
//@desc    delete a Item
//@access  Public
//params is used to get values from uri REMEMBER THAT ALREADY!!!
// in the catch we could send the res.json but!
//this way the response would be 0f 200 value which means that everything is fine
//to specificate it's not fine we send a new function!!!
//res.status(404) - not found - which eventually sends the json success false
//BTW the error would be an innexistemt id

router.delete('/:id', (req, res)=>{
    Item.findById(req.params.id)
    .then(item => item.remove().then(()=> res.json({success:true})))
    .catch((err)=> res.status(404).json({success:false}))
});

//exports.default component is a es6 ffashion when you use Babel
//the bellow is classic for node/express
module.exports = router;

//https://www.youtube.com/watch?v=5yTazHkDR4o
//lesson 2
//paused 23:30