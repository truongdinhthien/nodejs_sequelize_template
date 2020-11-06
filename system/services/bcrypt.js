const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        console.log(hash);
        return hash;
    } catch (error) {
        throw error
    }
}

exports.validPassword = async (password, thisPassword) => {
    try {
        return await bcrypt.compare(password, thisPassword);
    } catch (error) {
        throw error
    }
}



