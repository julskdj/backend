import mongoose from 'mongoose';

const emailSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

export const Email = mongoose.model('Email', emailSchema);