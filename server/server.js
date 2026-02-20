const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// REST API
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'NIMU server is running' });
});

// Socket.io
io.on('connection', (socket) => {
    console.log('🔥 User connected:', socket.id);

    socket.on('send_message', (data) => {
        console.log('📨 Message:', data);
        io.emit('new_message', data);
    });

    socket.on('disconnect', () => {
        console.log('💔 User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 NIMU server running on http://localhost:${PORT}`);
});
