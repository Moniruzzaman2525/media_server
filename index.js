// imports
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/configs/databaseConfigs.js";
import mediaRoutes from './src/routes/mediaRoute.js'
import userRoutes from './src/routes/userRoute.js'

// Application
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();


app.use("/api/v1/media/", mediaRoutes);
app.use("/api/v1/auth/", userRoutes);
// Routes
app.get("/", (req, res) => {
  return res.send("Server Running...!!");
});


// Handle Not valid routes
app.use("*", (req, res) => {
  return res.status(404).send("Invalid Route!!");
});

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
