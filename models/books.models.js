const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        enum: ["Fiction", "Non-fiction", "Business", "Autobiography", "Mystery", "Thriller", "Science Fiction", "Fantasy", "Romance", "Historical", "Biography", "Self-Help", "Other"],
    },
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        max: 10,
        min: 0
    },
    summary: {
        type: String,
    },
    coverImageUrl: {
        type: String,
    },
} , { timestamps: true})

const Book = mongoose.model("Book", bookSchema)
module.exports = Book

