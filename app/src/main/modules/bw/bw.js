import { BrowserWindow } from 'electron'

export default class Manager {

    constructor() {
        this.window = null;
    }

    create() {
        this.window = new BrowserWindow({
          height: 600,
          width: 800
        });

        this.load(process.env.WIN_URL);

        this.onClosed(() => {
            this.window = null;
        });
    }

    load(url) {
        this.window.loadURL(url);
    }

    onClosed(cb) {
        this.window.on('closed', cb);
    }
}
