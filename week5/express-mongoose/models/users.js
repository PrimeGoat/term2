const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
})


module.exports = mongoose.model('user', UserSchema);