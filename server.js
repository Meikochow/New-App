const express   = require("express");
const mongoose  = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

const items = require('./routes/api/items');

const app = express();

//Bodyparser Middleware

app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//connect to the mongo db
//it is promise based which means that when it connects --then-- it will console.log or pula mea our message 
//if it will fail (if the promise rejects) catch will log the error 
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//use routes
app.use('/api/items', items);

//server static assets if we are in production
if(process.env.NODE_ENV === 'production'){
//set a static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

