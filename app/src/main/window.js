import { BrowserWindow } from 'electron'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`;

 export default {

    window: null,

    create: function() {
        this.window = new BrowserWindow({
          height: 600,
          width: 800
        });

        this.load(winURL);

        this.onClosed(function() {
            this.window = null;
        });

        console.log('mainWindow opened')

    },

    load: function(url) {
        this.window.loadURL(url);
    },

    onClosed: function(cb) {
        this.window.on('closed', cb);
    }


}
