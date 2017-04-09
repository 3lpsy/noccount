const zerorpc = require("zerorpc");

export default class Client {
    constructor() {
        this.config = {
            protocol: 'tcp://',
            host: '127.0.0.1',
            port: '4242'
        }
        this.rpc = new zerorpc.Client()
        this.onError();
    }

    connect(options = {timeout: 10}) {
        this.rpc.connect(this.address(), options)
    }

    invoke(name, args) {
        return new Promise((resolve,reject) => {
            this.rpc.invoke(name, ...args, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(response));
                }
            });
        })
    }

    onError() {
        this.rpc.on("error", function(error) {
            console.error("RPC client error:", error);
        });
    }

    address() {
        return this.config.protocol + this.config.host + ':' + this.config.port;
    }
}
