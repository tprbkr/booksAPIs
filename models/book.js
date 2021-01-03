const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type: String
    },
    description:{
        type: String
    },
    genre:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Book', bookSchema);