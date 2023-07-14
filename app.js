import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/tasks.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env",
});

// Middlewares(import before router ALWAYS)
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Importing Routes
app.use("/api/v1/users" ,userRouter);
app.use("/api/v1/tasks" ,taskRouter);

app.get("/", (req,res)=>{
    res.send("Working");
});

//using error middleware
app.use(errorMiddleware);





// Dynamic Routing | why send using get? use params instead
// app.get("/userid", async (req,res)=>{
//     // const {id} = req.body;
//     const {id} = req.query;
//     const user = await User.findById(id);

//     res.json({
//         success:true,
//         user,
//     });
// });

//always keep the dynamic routing towards the end as in js or even in node the top-down code implementation is followed
// /userid/abcd
// /userid/saqlain both are same as the last is considered as id
// app.get("/userid/:id", async (req,res)=>{
//     // const {id} = req.body;
//     const {id} = req.params;
//     const user = await User.findById(id);

//     // console.log(req.params);
//     res.json({
//         success:true,
//         user,
//     });
// });


