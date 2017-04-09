import Client from './client';

export default class Api {

    constructor() {
        this.ready = false;
        this.client = null;
    }

    call(name, ...args) {
        console.log('invoke: ' + name);
        return new Promise((resolve,reject) => {
            this.connection().invoke(name, args).then((response) => {
                console.log(response);
                resolve(response);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    isConnected() {
        return new Promise((resolve,reject) => {
            this.call('hello').then((response) => {
                console.log('hello response', response);
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    }

    connection() {
        if (this.client) {
            return this.client;
        }

        let client = new Client();

        client.connect();

        this.client = client;

        return client;
    }

}
