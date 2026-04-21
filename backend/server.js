import dotenv from "dotenv";
import http from "http";
import {Server} from "socket.io";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { Socket } from "dgram";
import itemsRoute from "./src/routes/itemsRoute.js"


dotenv.config();
connectDB();

const server = http.createServer(app);
app.use("/api/items", itemsRoute);

//socket setup
const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

// store connected users
const users = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id)


// join user room 
socket.on("join", (userId) => {
    users[userId] = socket.id;
    socket.join(userId);
});

// join booking room (for tracking)
socket.on("joinBooking", (bookingId) => {
    socket.join(bookingId)
});

socket.on("disconnect", () => {
    console.log("User disconnected")
});

});

export { io };

// Connect database
connectDB();

// start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});