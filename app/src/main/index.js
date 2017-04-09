'use strict'

import { app, ipcMain} from 'electron'
import path from 'path';

process.env.ENV_PATH = app.getPath('userData') + '/.env';
process.env.USER_DATA_PATH = app.getPath('userData');

process.env.DAEMON_PATH = path.join(__dirname, './../server')
process.env.DAEMON_MAIN = 'noccount.py';
process.env.DAEMON_PORT = 4242;
process.env.DAEMON_COMPILED = false;

process.env.DAEMON_ALEMBIC_LOCAL_PATH = path.join(__dirname, './../server/db/local')
process.env.DAEMON_ALEMBIC_REPO_PATH = path.join(__dirname, './../server/db/repo')

process.env.DB_LOCAL_FILE = app.getPath('userData') + '/db.sqlite';
process.env.DB_REPO_FILE = app.getPath('userData') + '/repo.sqlite';

process.env.WIN_URL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('./../../../config').port}`
    : `file://${__dirname}/index.html`;

import bw from './modules/bw';
import daemon from './modules/daemon';

app.on('ready', () => {
    console.log('on ready');
    daemon.run().then(() => {
        bw.create();
    }).catch((error) => {
        console.log(error);
        bw.create();
    })
});

ipcMain.on('daemon-proc', (event) => {
    console.log('daemon-proc');
    if (daemon.proc && daemon.proc.pid > 0) {
        return event.sender.send('daemon-proc-reply', daemon.proc);
    } else {
        return event.sender.send('daemon-proc-reply', false);
    }
});

ipcMain.on('daemon-start', (event) => {
    console.log('daemon-start');
    daemon.run().then((proc) => {
        console.log('daemon success', proc);
        event.sender.send('daemon-start-reply', proc);
    }).catch((error) => {
        console.log(error);
        console.log('daemon failed');
        event.sender.send('daemon-start-reply', null);
    })
});

ipcMain.on('daemon-has-python3', (event) => {
    daemon.hasPython3().then((status) => {
        return event.sender.send('daemon-has-python3-reply', status);
    }).catch((error) => {
        console.error(error);
        return event.sender.send('daemon-has-python3-reply', error);
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        daemon.exit();
        app.quit()
    }
});

app.on('activate', () => {
    if (bw.window === null) {
          bw.create();
    }
});
