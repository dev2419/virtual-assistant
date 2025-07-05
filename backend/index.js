import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import geminiResponse from "./gemini.js"


const app = express();
app.use(cors({
    origin: "https://virtual-assistant-djoz.onrender.com",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(PORT, () => {
    connectDb()
  console.log(`Server is running on http://localhost:${PORT}`);
});
