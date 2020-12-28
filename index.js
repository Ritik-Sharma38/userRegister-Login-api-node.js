const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()

//connect to DB
mongoose.connect(
    "mongodb+srv://ritik:ritik123@cluster0.oh5dq.mongodb.net/portfolio?retryWrites=true&w=majority",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    ()=> console.log('Connected to db!')
)

//Middleware
app.use(express.json())

//route middelwares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


app.listen(process.env.PORT || 9000, ()=> console.log("Server up and running on port 3000"))