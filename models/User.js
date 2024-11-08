// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },  // Example role
    password: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);
