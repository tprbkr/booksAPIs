const Genre = require('../models/genre.js');
// const genreRoutes = require('../routes/genreRoutes.js');

// exports.create = (req, res) => {
//     var genre = req.body;
//     Genre.addGenre(genre,function(err,genre){
//         if(err){
//             throw err;
//         }
//         res.json(genre);
//     });
// }

exports.create = (req, res) => {
    console.log('req.body in controller:',req.body);
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Genre
    const genre = new Genre({
        name: req.body.name
        // content: req.body.content
    });

    // Save Genre in the database
    genre.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Genre."
        });
    });
};


// Retrieve and return all genres from the database.
exports.findAll = (req, res) => {
//    let limit = 1;
    // Genre.find().limit(limit)
    Genre.find()
    .then(result => {
        res.status(200).send({genres: result});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while retrieving genres."
        });
    });

    //old model res
    // Genre.find(function(err,genres){
    //     console.log('find genres',genres)
    //     if(err){
    //         throw err;
    //     }
    //     res.json(genres);
    // }).limit(limit);
   
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Genre.findById(req.params.genreId)
    .then(genre => {
        if(!genre) {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.genreId
            });            
        }
        res.status(200).send(genre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.genreId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving genre with id " + req.params.genreId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    console.log('update req:',req);
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Genre name can not be empty"
        });
    }

    // Find note and update it with the request body
    Genre.findByIdAndUpdate(req.params.genreId, {
        name: req.body.name || "Untitled Genre"
    }, {new: true})
    .then(genre => {
        if(!genre) {
            return res.status(404).send({
                message: "Genre not found with id xx" + req.params.genreId
            });
        }
        res.status(200).send(genre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.genreId,
                err: err
            });                
        }
        return res.status(500).send({
            message: "Error updating genre with id " + req.params.genreId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Genre.findByIdAndRemove(req.params.genreId)
    .then(genre => {
        if(!genre) {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.genreId
            });
        }
        res.send({message: "Genre deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.genreId
            });                
        }
        return res.status(500).send({
            message: "Could not delete genre with id " + req.params.genreId
        });
    });
};