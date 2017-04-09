import {ipcRenderer} from 'electron';
import api from 'api';
import {types as mutations} from 'daemon/store/mutations';
import {types as getters} from 'daemon/store/getters';

const types = {
    run: 'daemon/actions/run',
    runIfDown: 'daemon/actions/runIfDown',
    boot: 'daemon/actions/boot',
    hasPython3: 'daemon/actions/hasPython3',
    migrate: 'daemon/actions/migrate'

}

export {types};

export default  {
    [types.run]: (context, payload = {} ) => {
        return new Promise((resolve, reject) => {

            ipcRenderer.send('daemon-start');

            ipcRenderer.on('daemon-start-reply', (event, proc) => {
                if (! proc || ! proc.pid) {
                    reject(new Error('Cannot Start Daemon'));
                } else {
                    context.commit(mutations.isRunning)
                    context.commit(mutations.setPid, {pid: proc.pid})
                    resolve(proc.pid);
                }
            });
        })
    },
    [types.runIfDown]: (context, payload = {}) => {
        console.log('runIfDown');
        return new Promise((resolve, reject) => {
            ipcRenderer.send('daemon-proc');

            ipcRenderer.on('daemon-proc-reply', (event, proc) => {
                if (! proc || ! proc.pid) {
                    context.dispatch(types.run).then((pid) => {
                        if (! pid)  {
                            reject(new Error('Cannot Start Daemon'))
                        } else {
                            resolve(pid)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                } else {
                    context.commit(mutations.isRunning)
                    context.commit(mutations.setPid, {pid: proc.pid})
                    resolve(proc.pid);
                }
            });
        })
    },
    [types.hasPython3]: (context, payload = {} ) => {
        return new Promise((resolve, reject) => {

            ipcRenderer.send('daemon-has-python3');

            ipcRenderer.on('daemon-has-python3-reply', (event, hasPython3) => {
                if (hasPython3 === true) {
                    resolve(true);
                } else if (hasPython3 === false) {
                    resolve(false)
                }
                else {
                    reject(hasPython3);
                }
            })
        })
    },
    [types.boot]: (context, payload = {} ) => {
        return new Promise((resolve, reject) => {
            let data = {
                env: {
                    ENV_PATH: process.env.ENV_PATH,
                    USER_DATA_PATH: process.env.USER_DATA_PATH,
                    DAEMON_PATH: process.env.DAEMON_PATH,
                    DAEMON_MAIN: process.env.DAEMON_MAIN,
                    DAEMON_PORT: process.env.DAEMON_PORT,
                    DAEMON_COMPILED: process.env.DAEMON_COMPILED,
                    DAEMON_ALEMBIC_LOCAL_PATH: process.env.DAEMON_ALEMBIC_LOCAL_PATH,
                    DAEMON_ALEMBIC_REPO_PATH: process.env.DAEMON_ALEMBIC_REPO_PATH,
                    DB_LOCAL_FILE: process.env.DB_LOCAL_FILE,
                    DB_REPO_FILE: process.env.DB_REPO_FILE,
                    WIN_URL: process.env.WIN_URL
                }
            }
            api.call('boot', data).then((response) => {
                if (response && response.data) {
                    let status = response.data.status;
                    if (status) {
                        context.commit(mutations.setStatus, {status});
                        let migrations = response.data.migrations;
                        console.log(migrations);
                        context.commit(mutations.setMigrations, {migrations});
                        resolve(status);
                    } else {
                        reject(new Error("Boot failed -- no status"));
                    }
                }
                else {
                    reject(new Error("Boot failed"));
                }
            }).catch((error) => {
                throw error
            });
        });
    },
    [types.migrate]: (context, payload = {} ) => {
        let name = payload.name
        return new Promise((resolve, reject) => {
            api.call('migrate', name).then((response) => {
                if (response && response.data) {

                    let migration = response.data.migration;
                    if (migration) {
                        context.commit(mutations.setMigration, {migration});
                        resolve(migration);
                    } else {
                        reject(new Error("Migration Failed"));
                    }
                }
                else {
                    reject(new Error('Migration Failed'));
                }
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        })
    }
}
