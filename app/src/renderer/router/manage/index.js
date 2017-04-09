export const index = {
    path: '/manage',
    name: 'manage.index',
    component: require('pages/manage/index/Index')
}

export const install = {
    index: {
        path: '/manage/installation',
        name: 'manage.install.index',
        component: require('pages/manage/install/index/Index')
    }
}

export const log = {
    index: {
        path: '/manage/log',
        name: 'manage.log.index',
        component: require('pages/manage/log/index/Index')
    }
}

export const settings = {
     index: {
        path: '/settings',
        name: 'manage.settings.index',
        component: require('pages/manage/settings/index/Index')
    }
}

export const daemon = {
    restart: {
        index: {
            path: '/manage/daemon/restart',
            name: 'manage.daemon.restart.index',
            component: require('pages/manage/daemon/restart/index/Index')
        }
    }
}

export const status = {
     index: {
        path: '/status',
        name: 'manage.status.index',
        component: require('pages/manage/status/index/Index')
    }
}
