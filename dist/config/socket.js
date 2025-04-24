"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketIo = exports.setupSocket = void 0;
let io = null;
let users = {};
const setupSocket = (socketInstance) => {
    io = socketInstance;
    io.on("connection", (socket) => {
        console.log("SOCKET CONNECTION MADE:", socket.id);
        socket.on('join_topic', (topic) => {
            socket.join(topic);
            console.log(`User ${socket.id} joined topic: ${topic}`);
            // Optional: Notify others in the room
            socket.to(topic).emit('user_joined', {
                message: `User ${socket.id} has joined the topic ${topic}`,
            });
        });
        socket.on('send_message', ({ topic, message }) => {
            io.to(topic).emit('receive_message', {
                sender: socket.id,
                message,
            });
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    });
};
exports.setupSocket = setupSocket;
const getSocketIo = () => io;
exports.getSocketIo = getSocketIo;
