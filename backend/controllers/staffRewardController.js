import staffRewards from '../models/staffRewardModel.js';
import mongoose from 'mongoose';

//get all staffRewards
const getstaffRewards = async (req, res) => {
        const staffReward = await staffRewards.find({}).sort({createdAt: -1});

        res.status(200).json(staffReward);
}


//get a single staffReward

const getstaffReward = async (req, res) => { 
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such staffReward'})
    }
        const staffReward = await staffRewards.findById(id)

        if(!staffReward) {  

       return  res.status(404).json({error:'No such staffReward'})
        }

        res.status(200).json(staffReward)
}


//create a staffReward
const createstaffReward = async (req, res) => {
    const {pharmacistId} = req.body


    //add doc to db
    try{
        const staffReward = await staffRewards.create({pharmacistId})
        res.status(200).json(staffReward)
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

export {getstaffRewards, getstaffReward, createstaffReward}