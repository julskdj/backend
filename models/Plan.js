import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    item1: {
        type: String,
        required: true,
    },
    item2: {
        type: String,
        required: false,
    },
    item3: {
        type: String,
        required: false,
    },
    item4: {
        type: String,
        required: false,
    },
    item5: {
        type: String,
        required: false,
    }
})

export const Plan = mongoose.model('Plan', planSchema)