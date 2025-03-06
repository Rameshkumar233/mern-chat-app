import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const port = process.env.PORT || 3002;
const __dirname = path.resolve();

app.use(
    cors({
        origin: "https://mern-chat-app-2-p6d6.onrender.com",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

app.use("/api", authRoutes);
app.use("/api", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"));
    });
}

server.listen(port, () => {
    console.log(`server is running on port: ${port}`);
    connectDB();
});
