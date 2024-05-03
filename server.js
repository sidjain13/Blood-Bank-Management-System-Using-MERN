// This is our main file run using npm run server b/c script tag me nodemon use kar liya hai 

const express=require('express')
const dotenv=require('dotenv')
const colors=require('colors')
const morgan=require('morgan')
const cors=require('cors')
const connectDB = require('./config/db')



// dot config 
dotenv.config();

// mongodb connection 
connectDB();


// creating rest object 
const app=express();

// middlewares
app.use(cors());            //for connection frontend and backend b/c both are on different ports
app.use(express.json());        //dealing with json data
app.use(morgan('dev'));     //it gives up url on console when any url is hit 

const PORT=process.env.PORT || 8080;

// routes
app.use("/api/v1/test",require("./routes/testRoutes"));
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/inventory",require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics",require("./routes/analyticsRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));

app.listen(PORT,()=>{
    console.log(`node server running in ${process.env.DEV_MODE} port ${process.env.PORT}`.bgBlue.white);
})