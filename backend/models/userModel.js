import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    }
})

//static signUp method
userSchema.statics.signup = async function (email, password, name, contact) {

    //checking if the email is already in use
    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already in use')
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, name, contact })

    return user

}

export default mongoose.model('User', userSchema)