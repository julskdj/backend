import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {
            unique: true
        }
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    nombreCompleto: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    }

});

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt)
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Error al encriptar la contraseña");
    }
})

userSchema.methods.comparePassword = async function (frontendPassword) {
    return await bcryptjs.compare(frontendPassword, this.password);
}


export const User = mongoose.model('User', userSchema)