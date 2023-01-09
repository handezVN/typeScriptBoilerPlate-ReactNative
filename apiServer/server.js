const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const morgan = require("morgan");

const { ExpressPeerServer } = require("peer");
const { isObject } = require("util");

const app = express();
const server = http.createServer(app);
const io = socketio(server).sockets;
app.use(express.json());

const customGenerationFunction = () =>
    (Math.random().toString(36) + "0000000000000000000").substring(2, 16);

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: "/",
    generateClientId: customGenerationFunction,
});
app.use("/mypeer", peerServer);

peerServer.on("connection", (client) => {
    // console.log(client);

    console.log("connection established");
});
let users = [];
const AddUser = ({ userId, roomID, streamID }) => {
    users.push({ userId, roomID, streamID });
};
io.on("connection", function (socket) {
    console.log("some one connected");
    socket.on("join-room", ({ roomID, userId, streamID }) => {
        AddUser({ userId, roomID, streamID });

        socket.emit("list-users", { users });
        socket.join(roomID);
        socket.to(roomID).broadcast.emit("user-connected", { userId, users });
        console.log(users);
    });
    socket.on("out-room", ({ roomID, userId }) => {
        console.log("user disconnected");
        users = users.filter((user) => user.userId !== userId);
        socket.join(roomID);
        socket
            .to(roomID)
            .broadcast.emit("user-disconnected", { userId, users });
        console.log(users);
    });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
