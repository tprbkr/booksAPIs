const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3004;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log("Failed to connect to the database, error ", err);
    process.exit();
});

// Initial route
app.get('/', (req, res) => {
    res.send('Please use /genres or /books');
});

require('./routes/routes.js')(app);

app.listen(port, () => console.log(`app running on ${port}`));