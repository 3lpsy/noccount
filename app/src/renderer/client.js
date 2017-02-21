const zerorpc = require("zerorpc");

let client = new zerorpc.Client();

client.connect("tcp://127.0.0.1:4242");

client.on("error", function(error) {
    console.error("RPC client error:", error);
});

export default client;
