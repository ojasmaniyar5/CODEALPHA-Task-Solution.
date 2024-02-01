const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // For simplicity, just echoing the message back to the client
        ws.send(`You said: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Serve static files (like your HTML, CSS, and JS)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
