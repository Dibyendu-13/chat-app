const net = require('net');

// Array to store connected clients
const clients = [];

// Create a TCP server
const server = net.createServer(client => {
    // Add client to the list
    clients.push(client);

    // Notify all clients about new connection
    broadcast(`${client.remoteAddress}:${client.remotePort} joined the chat\n`, client);

    // Handle incoming messages from clients
    client.on('data', data => {
        const message = data.toString();
        broadcast(message, client);
    });

    // Remove client from the list when it disconnects
    client.on('end', () => {
        clients.splice(clients.indexOf(client), 1);
        broadcast(`${client.remoteAddress}:${client.remotePort} left the chat\n`, client);
    });
});

// Function to broadcast messages to all clients except the sender
function broadcast(message, sender) {
    clients.forEach(client => {
        if (client !== sender) {
            client.write(message);
        }
    });
}

// Start the server and listen on a specified port
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
