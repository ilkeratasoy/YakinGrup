/**
 * Yakın Grup — Realtime WebSocket Presentation Relay Server
 * 
 * Usage:
 *   node ws-server.js [port]
 * Default port: 8080
 */

const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || process.argv[2] || 8080;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Yakın Grup Realtime Presentation Sync WebSocket Server is running.\n');
});

const wss = new WebSocket.Server({ server });

// Map of roomId -> Set of client WebSockets
const rooms = new Map();

wss.on('connection', (ws, req) => {
  let currentRoom = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const roomId = data.roomId || 'DEFAULT';

      if (currentRoom !== roomId) {
        if (currentRoom && rooms.has(currentRoom)) {
          rooms.get(currentRoom).delete(ws);
        }
        currentRoom = roomId;
        if (!rooms.has(currentRoom)) {
          rooms.set(currentRoom, new Set());
        }
        rooms.get(currentRoom).add(ws);
      }

      // Broadcast to all clients in the same room (including or excluding sender)
      const clients = rooms.get(roomId);
      if (clients) {
        const payload = JSON.stringify(data);
        for (const client of clients) {
          if (client.readyState === WebSocket.OPEN && client !== ws) {
            client.send(payload);
          }
        }
      }
    } catch (err) {
      console.error('Error processing WS message:', err);
    }
  });

  ws.on('close', () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(ws);
      if (rooms.get(currentRoom).size === 0) {
        rooms.delete(currentRoom);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`[Yakın Grup] Presentation WebSocket Server listening on port ${PORT}`);
});
