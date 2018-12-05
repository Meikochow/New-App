const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//Create schema
const ItemSchema = new Schema({
    name:{
        type     : String,
        required : true
    },
    date:{
        type     : Date,
        default  : Date.now
    }
});

//we export the model also which exports a name and the schema
module.exports = Item = mongoose.model('item', ItemSchema);