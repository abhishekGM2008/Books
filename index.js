const { initialData } = require("./db/db.connect")
initialData()
const Book = require("./models/books.models")


const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


const PORT = 3000
app.listen(PORT , () => {
    console.log("Server running on" , PORT)
})

//1,2 Function to create the new Book.

const createNewBook = async (newBook) => {
    try{
        const newBookCreated = new Book(newBook)
        const savedNewBook = await newBookCreated.save()
        return savedNewBook
    }
    catch(error) {
        console.log('error occured while createing new book', error)
    }
}

app.post("/books", async (req, res) => {
    try{
        const newBookAdded = await createNewBook(req.body)
        if(newBookAdded) {
            res.status(210).json({message: "Book Added successfully", book: newBookAdded})
        }
        else {
            res.status(404).json({error: "book not Found"})
        }
    }
    catch(error) {
        res.status(500).json({error: "Failed to create new book."})
    }
})

app.get("/", (req, res) => {
    res.send("hi I am ready..")
})

//3 Function to get all books in database

const readAllBooks = async () =>  {
    try{
        const booksFound = await Book.find()
        return booksFound
    }
    catch(error) {
        console.log('error occured while reading all books', error)
    }
}

app.get("/allBooks", async (req, res) => {
    try{
        const allBooks = await readAllBooks()
        if(allBooks.length > 0) {
            res.json(allBooks)
        } else{
            res.status(404).json({error: 'no books found.'})
        }
    }
    catch(error) {
        res.status(500).json({error: 'failed to fetch book.'})
    }
})

//4 Function to find book sby titles

const booksByTitle = async (bookTitle) => {
    try{
        const findByTitle = await Book.findOne({title: bookTitle})
        return findByTitle
    }
    catch(error){
        console.log('error occured while finding the book', error)
    }
}

app.get("/books/:bookTitle", async (req, res) => {
    try{
        const selectdBook = await booksByTitle(req.params.bookTitle)
        if(selectdBook) {
            res.status(201).json(selectdBook)
        } else {
            res.status(404).json({error: 'no book found.'})
        }
    }
    catch(error) {
        res.status(500).json({error: "Failed to fetch book."})
    }
})

//5 , Function to get book details by pasing authors name

const booksByAuthor = async (authorName) => {
    try{
        const findByAuthor = await Book.find({author: authorName})
        return findByAuthor
    }
    catch(error) {
        console.log('error occured while finding the book', error)
    }
}

app.get("/books/author/:authorName" , async (req, res) => {
    try{
        const selectedAuthor = await booksByAuthor(req.params.authorName)
        if(selectedAuthor){
            res.status(201).json(selectedAuthor)
        } else {
            res.status(404).json({error: "Book npt found" })
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to find the book"})
    }
})


//6, to get all the books which are of busines genre...

const findBooksByGenre = async (businessGenre) => {
    try{
        const bookGenre = await Book.find({genre: businessGenre})
        return bookGenre
    }
    catch(error){
        console.log('error occured while reading books', error)
    }
}

app.get("/books/genre/:businessGenre", async (req, res) => {
    try{
        const selectedGenre = await findBooksByGenre(req.params.businessGenre)
        if(selectedGenre.length > 0 ) {
            res.status(200).json(selectedGenre)
        } else {
            res.status(404).json({error: "No books found."})
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch books."})
    }
})

//7, function to get bbok which are released in 2022

const booksRelease = async (releasedBook) => {
    try{
        const yearBook = await Book.find({publishedYear: releasedBook})
        return  yearBook
    }
    catch(error){
        console.log("error occurerd while fetching", error)
    }
}

app.get("/books/year/:releasedBook", async (req, res) => {
    try{
        const selectedYear = await booksRelease(req.params.releasedBook)
        if(selectedYear.length > 0){
            res.status(201).json(selectedYear)
        } else {
            res.status(404).json({error: "Book not Found."})
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch the book."})
    }
})

//8, function to update leanIn book rating.

const updateBookByRating = async (bookId , bookRating) => {
    try{
        const booksFound = await Book.findByIdAndUpdate(bookId, bookRating, {new: true})
        return booksFound
    }
    catch(error){
        console.log('error occured while updating book', error)
    }
}

app.post("/books/update/:bookId", async (req, res) => {
    try{
        const bookUpdated = await updateBookByRating(req.params.bookId , req.body)
        if(bookUpdated){
            res.status(200).json({message: "book updated successfully", book: bookUpdated})
        } else {
            res.status(400).json({error: "No book found."})
        }
    }
    catch(error){
        res.status(500).json({error: "failed to update the book."})
    }
})


//9, function to update shoe-dog book rating

const updateBookByYear = async (bookTitle , updateData) => {
    try{
        const booksFound = await Book.findOneAndUpdate({title: bookTitle}, updateData, {new: true})
        return booksFound
    }
    catch(error){
        console.log("error occured while updating book", error)
    }
}

app.post("/books/updated/:bookTitle", async (req, res) => {
    try{
        const updatedBook = await updateBookByYear(req.params.bookTitle, req.body)
        if(updatedBook){
            res.status(201).json({message: "Updated successfully", book: updatedBook})
        } else {
            res.status(400).json({error: "failed to update."})
        }
    }
    catch(error){
        res.status(500).json({error: "book not found"})
    }
})

//10, function to delete book by Id

const deletedBookById = async (bookId) => {
    try{
        const bookSelected = await Book.findByIdAndDelete(bookId, {new: true})
        return bookSelected
    }
    catch(error){
        console.log("error occured while deleting Book.", error)
    }
}

app.delete("/books/deleteBook/:bookId", async (req, res) => {
    try{
        const deletedBook = await deletedBookById(req.params.bookId)
        if(deletedBook){
            res.status(201).json({message: "Book deleteion successfull", book: deletedBook})
        } else {
            res.status(404).json({error: "failed to delete the book."})
        }
    }
    catch(error){
        res.status(500).json({error: "Book not found."})
    }
})