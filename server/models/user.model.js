const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: [
            true,
            'First name is required'
        ],
        minlength: [
            3,
            "First name must be at least 3 characters long"
        ],
        trim: true
    },
    lastname:{
        type: String,
        required: [
            true,
            'Last name is required'
        ],
        minlength: [
            3,
            "Last name must be at least 3 characters long"
        ],
        trim: true
    },
    email:{
        type: String,
        required: [
            true,
            'Email is required'
        ],
        unique: [
            true,
            'Email is already exists'
        ],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Email must be valid'
        ]
    },
    password:{
        type: String,
        required: [
            true,
            'Password is required'
        ],
        minlength: [
            8,
            "Password must be at least 8 characters long"
        ],
        select:false
    },
    birthdate: {
        type: Date,
        required: [true, 'Birthdate is required'],
        validate: {
            validator: function(value) {
                const today = new Date();
                const minAgeDate = new Date(
                    today.getFullYear() - 16,
                    today.getMonth(),
                    today.getDate()
                );
                return value <= minAgeDate;
            },
            message: 'You must be at least 16 years old'
        }
    },
    picture: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        match: [/^\+[1-9]\d{7,14}$/, 'Please use valid international phone number']
    },

    whatsapp: {
        type: String,
        required: [true, 'Whatsapp is required'],
        match: [/^\+[1-9]\d{7,14}$/, 'Please use valid international whatsapp number']
    },
    location: {
        country: {
            type: String,
            required: [true, 'Country is required']
        },
        city: {
            type: String,
            required: [true, 'City/State is required']
        }
    }
}, {
    timestamps:true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;