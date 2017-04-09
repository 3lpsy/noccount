export default {
    daemon: {
        status: {
            isInstalled: false,
            isRunning: false,
            isBooted: false,
            isConfigured: false,
            isMigrated: false,
            hasPython3: false
        },
        pid: null,
        migratations: [
            {
                name: 'local',
                version: 0
            },
            {
                name: 'repo',
                version: 0
            }
        ]
    }
}
