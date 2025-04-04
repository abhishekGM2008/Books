const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

const initialData = async() => {
   await mongoose 
   .connect(mongoUri)
   .then(() => {
    console.log("Connected to Database")
   })
   .catch((error) => console.log("error occured", error))
}

module.exports = { initialData }