
const types = {
    isBooted: 'daemon/getters/isBooted',
    isRunning: 'daemon/getters/isRunning',
    isInstalled: 'daemon/getters/isInstalled',
    isMigrated: 'daemon/getters/isMigrated',
    pid: 'daemon/getters/pid',
    migration: 'daemon/getters/migration'

}

export {types};

export default {
    [types.isBooted]: (state, getters) => {
        return state.daemon.status.isBooted;
    },
    [types.isRunning]: (state, getters) => {
        return state.daemon.status.isRunning;
    },
    [types.isInstalled]: (state, getters) => {
        return state.daemon.status.isInstalled;
    },
    [types.pid]: (state, getters) => {
        return state.daemon.pid;
    },
    [types.isMigrated]: (state, getters) => {
        return state.daemon.migrations.map(migration => migration).reduce((carry, mig) => {
            return carry.version !== 0 && mig.version !== 0
        });
    },
}
