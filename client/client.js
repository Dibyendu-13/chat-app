const net = require('net');
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Connect to the server
const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to server');
});

// Receive messages from the server
client.on('data', data => {
    console.log(data.toString());
});

// Handle user input and send messages to the server
rl.on('line', input => {
    client.write(input);
});

// Close the connection when the client exits
rl.on('close', () => {
    client.end();
});
