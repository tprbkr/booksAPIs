const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


const genreSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Genre', genreSchema);