import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
});

export const Tasks = mongoose.model("Tasks", schema);