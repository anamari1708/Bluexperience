const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const path = require('path');

dotenv.config() //loads environment variables from a . env file into process. env

mongoose.connect(process.env.DATABASE_ACCESS,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
  (err) => {
   if (err) return console.error(err);
   console.log("Connected to MongoDB");
});

const app = express()
app.use(cookieParser())
app.use(express.json()) 


//import routes
app.use('/auth', require("./routers/userRouter")) 
app.use("/work", require("./routers/workRouter"))
app.use("/offer", require("./routers/offerRouter"))
app.use("/apply", require("./routers/applyRouter"))

app.use('/uploads', express.static(path.join(__dirname, 'frontend/public/uploads')))

//import the client build folder to the server.
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')))
//handles any requests by redirecting them to index.html
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))