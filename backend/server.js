import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//import routes
import userRoutes from './routes/user.js';
import prescriptionRoutes from './routes/prescription.js';
import reorderRoutes from './routes/reorder.js';
import drugoutsRoutes from './routes/drugouts.js';
import LeaveoutRoutes from './routes/leaveout.js'
import medicineNameRoutes from './routes/medicinenames.js';
import leaderboardRoutes from './routes/leaderboard.js';




import staffRewardRoutes from './routes/staffReward.js';
/*import handledRoutes from './routes/handled.js';*/
import expiredRoutes from './routes/expired.js';
import abtexpiredRoutes from './routes/abtexpired.js';
import outofstockRoutes from './routes/outofstocks.js';
import abtoutofstocksRoutes from './routes/abtoutofstocks.js';
import billing from './routes/billing.js';
import staffReward from './routes/staffReward.js';
import leaderboard from './routes/leaderboard.js';
import allprescriptionRoutes from './routes/AllPrescriptions.js';

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

app.use('/api/prescriptiongetall', allprescriptionRoutes )

app.use('/api/reorder', reorderRoutes)

app.use('/api/expired', expiredRoutes)

app.use('/api/abtexpired', abtexpiredRoutes)

app.use('/api/outofstock', outofstockRoutes)

app.use('/api/abtoutofstock', abtoutofstocksRoutes)

app.use('/api/drugouts',drugoutsRoutes)

app.use('/api/medicinenames',medicineNameRoutes)

app.use('/api/billing',billing)

app.use('/api/staffReward',staffReward)

app.use('/api/leaves', LeaveoutRoutes)

app.use('/api/leaderboard', leaderboard)




//connect to the database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, ()=> {
    console.log(`Connected to db & Listening on ${process.env.PORT}`);
})
})
.catch((err) => console.log(err))

