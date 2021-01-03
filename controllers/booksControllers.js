const Book = require('../models/book.js');

// console.log('in controller of books',Book);
// console.log(Book);

exports.create = (req, res) => {
    console.log('req.body in controller:',req.body);
    // Validate request
    if(!req.body.title && !req.body.genre) {
        return res.status(400).send({
            message: "title and genre of the book are required"
        });
    }

    // Create a Genre
    const book = new Book(req.body);

    // Save Genre in the database
    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding book."
        });
    });
};


// Retrieve and return all genres from the database.
exports.findAll = (req, res) => {
//    let limit = 1;
    // Genre.find().limit(limit)
    Book.find()
    .then(result => {
        res.status(200).send({books: result});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while retrieving books."
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
    Book.findById(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });            
        }
        res.status(200).send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Genre not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving genre with id " + req.params.bookId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    console.log('update req:',req.body);
    // Validate Request
    // if(!req.body.title) {
    //     return res.status(400).send({
    //         message: "Book title can not be empty"
    //     });
    // }

    // Find book and update it with the request body
    Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id xx" + req.params.bookId
            });
        }
        res.status(200).send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId,
                err: err
            });                
        }
        return res.status(500).send({
            message: "Error updating book with id " + req.params.bookId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
    .then(genre => {
        if(!genre) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Book with id " + req.params.bookId
        });
    });
};