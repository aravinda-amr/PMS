import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)