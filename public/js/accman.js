const bcrypt = require('bcrypt');
const User = require('./models/user');

async function register(name, email, password){
    
    const hashpass = await bcrypt.hash(password, 10)

    const newUser = new User({
        name,
        email,
        passhash: hashpass
    });

    if(!newUser.Save()){
        throw error;
    }

    return newUser;
}

async function login(email, password){
    
    const getUser = new User({
        email,
        password: password
    });
    
    const match = await bcrypt.compare(password, User.password)

    if (!match) {
        throw error("Invalid e-mail or password.");
    } else{
        return getUser;
    }

}

module.exports = {
    register,
    login
};