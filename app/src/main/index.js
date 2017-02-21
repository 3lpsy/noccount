'use strict'

import { app, BrowserWindow } from 'electron'
import bw from './window';
import server from './server';

let mainWindow;

app.on('ready', () => {
    bw.create();
    server.create()
})

app.on('window-all-closed', () => {
    server.exit();
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (bw.window === null) {
          bw.create();
    }
})
