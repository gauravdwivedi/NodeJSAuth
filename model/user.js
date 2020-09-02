const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        confirmed: {
            type: Boolean,
            default: false
        },
        required: true,
    },

    name: {
        type: String,
        required: true
    },

    isSponser: {
        type: Boolean,
        default: false
    },
    
}, {
    timestamps: true
});



const User = mongoose.model('User', userSchema);

module.exports = User;