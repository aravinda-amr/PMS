import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//import routes
import userRoutes from './routes/user.js';
import prescriptionRoutes from './routes/prescription.js';
import reorderRoutes from './routes/reorder.js';
import drugoutsRoutes from './routes/drugouts.js';



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

app.use('/api/prescription', prescriptionRoutes)

app.use('/api/reorder', reorderRoutes)

app.use('/api/drugouts',drugoutsRoutes)


//connect to the database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, ()=> {
    console.log(`Connected to db & Listening on ${process.env.PORT}`);
})
})
.catch((err) => console.log(err))

