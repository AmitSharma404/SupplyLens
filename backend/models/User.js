import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId;
        }
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'staff'],
        default: 'staff'
    },
    organization: {
        type: String,
        default: 'Legacy Workspace'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;