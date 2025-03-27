import { createServer } from "node:http";
import next from "next";
// import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = dev ? 3001 : 3002;

import https from 'https';
import fs from 'fs';
// import { Server } from "socket.io";
import { setupSocket } from "./socketEvents.js"; // Import WebSocket setup

const options = {
  key: fs.readFileSync('/var/www/jacksonvillians/ssl/privkey.pem'), // Private key
  cert: fs.readFileSync('/var/www/jacksonvillians/ssl/fullchain.pem'), // SSL certificate
};

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create an HTTPS server
  const server = https.createServer(options, (req, res) => {
    return handle(req, res);  // Handle Next.js pages
  });

  setupSocket(server);

  // Start the server
  server.listen(port, () => {
    console.log(`> Ready on https://localhost:${port}`);
  });
});












// when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer(handler);

//   const io = new Server(httpServer);

//   io.on("connection", (socket) => {
//     console.log(socket, ' is sockets')
//     // ...
//   });

//   httpServer
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });





















