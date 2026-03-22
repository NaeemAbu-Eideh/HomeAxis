const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        minlength: [3, "title must be at least 3 characters"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
        minlength: [3, "description must be at least 3 characters"],
        maxlength: [2000, "description must be at most 2000 characters"],
    },
    type: {
        type: String,
        required: [true, "type is required"],
        trim: true,
        default: "rent"
    },
    location: {
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true,
        },
        city: {
            type: String,
            required: [true, 'City/State is required'],
            trim: true,
        }
    },
    google_map: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount must be at least 0"],
        validate: {
            validator: Number.isFinite,
            message: "Amount must be a valid number"
        }
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
    image: {
        type: String,
        required: [true, 'Image is required'],
        trim: true,
    },
    images: {
        type: [String],
        default: [],
    },
    services: {
        type: [String],
        default: [],
    },
    target: {
        type: String,
        required: [true, 'Target is required'],
        trim: true
    },
    available: {
        type: Boolean,
        default: true,
        required: [true, 'Available is required'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Owner is required"],
    }
}, {
    timestamps: true
});

const Apartment = mongoose.model('Apartment', ApartmentSchema);
module.exports = Apartment;