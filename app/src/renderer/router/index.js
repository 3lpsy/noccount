import Vue from 'vue'
import Router from "vue-router";
import * as guards from 'guards';
import api from 'api';

Vue.use(Router);

import * as root from "./root";
import * as home from "./home";
import * as mbox from "./mbox";
import * as imap from "./imap";
import * as manage from "./manage";
import * as test from "./test";

let routes = [
    root.index,
    home.index,
    mbox.index,
    imap.index,
    manage.index,
    manage.install.index,
    manage.log.index,
    manage.settings.index,
    manage.status.index,
    manage.daemon.restart.index,
    test.index,
    {path: '*', redirect: '/home'}
];

const router = new Router({
    linkActiveClass: 'active',
    routes,
    mode: "hash"
});

import store from 'store';
router.beforeEach((to, from, next) => {
    console.log(to.matched);
    let noCheck = ["manage.install.index", "root.index"];
    let noCheckNeeded = to.matched.reduce((carry, route) => {
        if (! noCheck.includes(route.name)) {
            return false;
        }
        return true;
    }, true);
    if (noCheckNeeded) {
        console.log("no check", to.matched);
        next();
    } else {
        let isRunning = store.getters['daemon/getters/isRunning'];
        let isBooted = store.getters['daemon/getters/isBooted'];
        let isInstalled = store.getters['daemon/getters/isInstalled'];
        console.log(isRunning, isBooted, isInstalled);
        if (!isBooted || ! isInstalled || ! isRunning) {
            next({name: 'root.index'});
        }
        next();
    }
})

export default router;
