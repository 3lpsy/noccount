<template lang="html">
    <div>
        <section class="hero is-small is-primary is-bold has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Noccount
                    </h1>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="heading has-text-centered" v-if="view === 'loading'">
                    <clip-loader color="#26879f"></clip-loader>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader'

export default {
    data() {
        return{
            view: 'loading'
        }
    },
    computed: {
        pid() {
            return this.$store.getters['daemon/getters/pid'];
        },
        isRunning() {
            return this.$store.getters['daemon/getters/isRunning'];
        },
        isBooted() {
            return this.$store.getters['daemon/getters/isBooted'];
        },
        isInstalled() {
            return this.$store.getters['daemon/getters/isInstalled'];
        }
    },
    methods: {
        load() {
            this.runIfDown().then((pid) => {
                if (pid && pid > 0) {
                    if (! this.isBooted) {
                        this.boot().then((status) => {
                            if (this.isBooted) {
                                if (! this.isInstalled) {
                                    return this.needsInstall();
                                } else {
                                    return this.ready();
                                }
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    } else {
                        if (! this.isInstalled) {
                            // return this.needsInstall();
                        } else {
                            // return this.ready();
                        }
                    }
                } else {
                    this.needsDaemon();
                }
            }).catch((error) => {
                console.log(error);
                return this.needsDaemon();
            });

        },
        runIfDown() {
            return this.$store.dispatch('daemon/actions/runIfDown');
        },
        boot() {
            return this.$store.dispatch('daemon/actions/boot');
        },
        needsInstall() {
            return this.$router.push({name: 'manage.install.index'});
        },
        needsDaemon() {
            // can the daemon even be started, if not go to install
            let canStartDaemon = false;
            if (! canStartDaemon) {
                return this.needsInstall();
            } else {
                return this.$router.push({name: 'manage.daemon.needs-daemon.index'});
            }
        },
        ready() {
            return this.$router.push({name: 'home.index'});
        }
    },
    mounted() {
        this.load();
    },
    components: {
        ClipLoader
    },
}
</script>

<style lang="css">
</style>
