import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';

dotenv.config()

const app = express()

//parse the request body
app.use(express.json())

//global middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user', userRoutes)


//connect to the database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, ()=> {
    console.log(`Connected to db & Listening on ${process.env.PORT}`);
})
})
.catch((err) => console.log(err))

