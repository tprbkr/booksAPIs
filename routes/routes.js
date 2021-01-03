module.exports = (app) => {
    const books = require('../controllers/booksControllers.js');
    const genres = require('../controllers/genresController.js');

    //Genre routes

    // Create a new genre
    app.post('/genres', genres.create);

    // // Retrieve all genres
    app.get('/genres', genres.findAll);

    // Retrieve a single genre with genreId
    app.get('/genres/:genreId', genres.findOne);

    // Update a genre with genreId
    app.put('/genres/:genreId', genres.update);

    // Delete a genre with genreId
    app.delete('/genres/:genreId', genres.delete);

    //Book routes

    // Create a new book
    app.post('/books', books.create);

    // Retrieve all books
    app.get('/books', books.findAll);

    // Retrieve a single book with bookId
    app.get('/books/:bookId', books.findOne);

    // Update a book with bookId
    app.put('/books/:bookId', books.update);

    // Delete a book with bookId
    app.delete('/books/:bookId', books.delete);
}