import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import path from "path";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { logger } from "./middleware/logEvents.js";
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/dbConn.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

connectDB();

// custom middleware logger
app.use(logger);


// built-in middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', await import("./routes/root.js").then((res) => res.default) );

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
})

