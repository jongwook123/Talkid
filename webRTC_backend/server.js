import express from 'express';
import http from 'http';
import cors from "cors";
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

const PORT = 8090;
const users = {};
const socketToRoom = {};
const maximum = 4;

app.use(cors());

io.on('connection', socket => {
    socket.on('join_room', data => {
        console.log(data);

        if (users[data.room]) {
            const length = users[data.room].length;

            if (length === maximum) {
                socket.to(socket.id).emit('room_full');

                return;
            }

            users[data.room].push({ id: socket.id, email: data.email });
        } else {
            users[data.room] = [{ id: socket.id, email: data.email }];
        }

        console.log(data);

        socketToRoom[socket.id] = data.room;

        socket.join(data.room);
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

        const usersInThisRoom = users[data.room].filter(user => user.id !== socket.id);

        io.sockets.to(socket.id).emit('all_users', usersInThisRoom);
    });

    socket.on('offer', data => {
        socket.to(data.offerReceiveID).emit('getOffer', { sdp: data.sdp, offerSendID: data.offerSendID, offerSendEmail: data.offerSendEmail });
    });

    socket.on('answer', data => {
        socket.to(data.answerReceiveID).emit('getAnswer', { sdp: data.sdp, answerSendID: data.answerSendID });
    });

    socket.on('candidate', data => {
        socket.to(data.candidateReceiveID).emit('getCandidate', { candidate: data.candidate, candidateSendID: data.candidateSendID });
    });

    socket.on('translate', data => {
        socket.to(socketToRoom[socket.id]).emit('getTranslate', { translateSendEmail: data.translateSendEmail, translatedText: data.translatedText });
    });

    socket.on('disconnect', () => {
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);

        const roomID = socketToRoom[socket.id];
        let room = users[roomID];

        if (room) {
            room = room.filter(user => user.id !== socket.id);
            users[roomID] = room;

            if (room.length === 0) {
                delete users[roomID];

                return;
            }
        }

        socket.to(roomID).emit('user_exit', { id: socket.id });
    });
});

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});