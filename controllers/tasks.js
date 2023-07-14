import ErrorHandler from "../middlewares/error.js";
import { Tasks } from "../models/tasks.js";

export const newTask = async (req,res,next) => {
    try{
        const { title, description } = req.body;

        if(title == "") return next(new ErrorHandler("Title Cannot be empty", 200, false));
        if(description == "") return next(new ErrorHandler("Description Cannot be empty", 200, false));

        const task = await Tasks.create({
            title,
            description,
            user: req.user,
        });

        next(new ErrorHandler("Task Added Successfully", 201, true));
    }
    catch(error){
        console.log("Some error occured");
        next(new ErrorHandler());
    }
    
};

export const getMyTasks = async (req,res,next) => {
    try{
        const userid = req.user._id;
        const tasks = await Tasks.find({ user:userid });
        res
            .status(200)
            .json({
                success: true,
                tasks,
            });
    }
    catch(error){
        console.log("Some error occured");
        next(new ErrorHandler());
    }
};

export const updateStatus = async (req,res,next) => {
    try{
        const task = await Tasks.findById(req.params.id);
        if(!task) return next(new ErrorHandler("Invalid ID", 200, false));
        task.isCompleted = !task.isCompleted;
        await task.save();
        next(new ErrorHandler("Task Status Updated", 200, true));
    }
    catch(error){
        console.log("Some error occured");
        next(new ErrorHandler());
    }
};

export const deleteTask = async (req,res,next) => {
    try{
        const task = await Tasks.findById(req.params.id);
        if(!task) return next(new ErrorHandler("Invalid ID", 200, false));
        await task.deleteOne();
        next(new ErrorHandler("Task Deleted", 200, true));
    }
    catch(error){
        console.log("Some error occured");
        next(new ErrorHandler());
    }
    
};

export const updateTask = async (req,res,next) => {
    try{
        const { id } = req.params;
        const { title, description } = req.body;
        let task = await Tasks.findById(id);
        if(!task) return next(new ErrorHandler("Invalid ID", 200, false));
        task.title = title;
        task.description = description;
        if(title == "") return next(new ErrorHandler("Title Cannot be empty", 200, false));
        if(description == "") return next(new ErrorHandler("Description Cannot be empty", 200, false));
        await task.save();
        next(new ErrorHandler("Task Details Updated", 200, true));
    }
    catch(error){
        console.log("Some error occured");
        next(new ErrorHandler());
    }
};
