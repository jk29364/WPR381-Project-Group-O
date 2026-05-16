const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    passhash: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user"
    }

}, {
    timestamps: true
});

function Save(name, email, passhash){
    try{
        //Place mongo save command here

    }
    catch(error){
        console.log(error);
        return false;
    }

    return true;
}

function Search(email){
    const searchedUser = new userSchema(null, email, null, null)

    //Place mongo search command here

    return searchedUser;
}

module.exports = mongoose.model('User', userSchema, Save, Search);