import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js"
import  errorHandler from "./middlware/errorMiddleware.js";

const app = express();

// middleware

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// health check route
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use(errorHandler);


export default app;