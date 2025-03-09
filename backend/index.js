// Server setup
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDb from "./utils/db.js";

// Import routes
import authroutes from './routes/authroutes.js';
import employeeroutes from './routes/employeeroutes.js';
import adminroutes from './routes/adminroutes.js';

// Load environment variables from .env file
dotenv.config({ path: './config.env' });

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connecting frontend and backend
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

// API route prefix
app.use("/api", authroutes);
app.use("/api/employee", employeeroutes);
app.use("/api/admin", adminroutes);

// Handle 404 - Route Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found", success: false });
});

const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        success: false,
    });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // Connecting to MongoDB
    connectMongoDb();
    console.log(`Server running at Port ${PORT}`);
});
