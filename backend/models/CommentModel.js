import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    day:{
        type: Date,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Comment', commentSchema)

