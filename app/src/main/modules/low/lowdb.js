import { app } from 'electron'
import Cryptr from 'cryptr';
import lowdb from 'lowdb';

const cryptr = new Cryptr('my secret key');

export default class Manager {
    constructor() {
        this.default = null;
        this.paths = {};
        this.dbs = {};
    }

    create(name = "default", path = null, config = null) {
        if (this.shouldCreate(name)) {
            let db = this.createLow(name, path, config);
            this.setLow(name, db);
        }
    }

    createLow(name = null, path = null, config = null) {
        if (name === 'default') {
            this.createDefaultLow(path, config);
        }
    }

    createDefaultLow(path = null, config = null) {
        path = path ? path : this.getDefaultPath();
        config = config ? config : this.getDefaultConfig();
        return lowdb(path, config);
    }

    getDefaultPath() {
        return this.getBasePath() + '/db.json';
    }

    getDefaultConfig() {
        return {
            storage: require('lowdb/lib/storages/file-async'),
            format: {
                deserialize: (str) => {
                    const decrypted = cryptr.decrypt(str);
                    const obj = JSON.parse(decrypted);
                    return obj;
                },
                serialize: (obj) => {
                    const str = JSON.stringify(obj);
                    const encrypted = cryptr.encrypt(str);
                    return encrypted;
                }
            },
        }
    }

    getBasePath() {
        return app.getPath('userData');
    }

    getPath(name) {
        return this.getBasePath() + `/${name}.json`;
    }

    setLow(name, db) {
        if (name === 'default') {
            return this.default = db;
        }
        return this.dbs[name] = db;
    }

    shouldCreate(name = null) {
        if (name === null) {
            return ! this.default;
        }
        return ! this.dbs[name];
    }


}
