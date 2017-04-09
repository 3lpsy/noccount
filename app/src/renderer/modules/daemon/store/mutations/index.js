const types = {
    setStatus: 'daemon/mutations/SET_STATUS',
    setPid: 'daemon/mutations/SET_PID',
    isRunning: 'daemon/mutations/IS_RUNNING',
    setMigration: 'daemon/mutations/SET_MIGRATION',
    setMigrations: 'daemon/mutations/SET_MIGRATIONS',

}

export {types};

export default {

    [types.setStatus]: (state, payload = {}) => {
        if (! payload.status) {
            throw new Error('No Status')
        } else {
            state.daemon.status = payload.status;
        }
    },
    [types.setPid]: (state, payload = {}) => {
        if (! payload.pid) {
            throw new Error('No Pid')
        } else {
            state.daemon.pid = payload.pid;
        }
    },
    [types.isRunning]: (state, payload = {isRunning: true}) => {
        if (! payload.isRunning) {
            throw new Error('No Running Status')
        } else {
            state.daemon.status.isRunning = payload.isRunning;
        }
    },
    [types.setMigration]: (state, payload = {}) => {
        console.log(payload);
        if (! payload.migration) {
            throw new Error('No Migration')
        }
        else if (! payload.migration.name || (payload.migration.version !== 0 || parseInt(payload.migration.version) > 0)) {
            throw new Error('No Migration Version Or Name')
        }
        else {
            let migration = payload.migration;
            let mig = state.daemon.migrations.find((mig) => {
                return mig.name === migration.name
            });
            if (mig) {
                Object.assign(mig, migration);
            }
        }
    },
    [types.setMigrations]: (state, payload = {}) => {
        if (! payload.migrations || payload.migrations.length < 1) {
            throw new Error('No Payload Migrations')

        } else {
            state.daemon.migrations = payload.migrations;
        }
    },
}
