<template>
    <div>
        <nav class="nav  has-shadow">
            <div class="nav-left">
                <router-link
                    :to="{name: 'root.index'}"
                    class="nav-item">
                    Home

                </router-link>
            </div>
        </nav>
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
                <div class="heading has-text-centered" v-if="view === 'begin'">
                    <h1 class="title">Install</h1>
                    <div class="block">
                        <a class="button is-dark" @click.prevent="install">Begin</a>
                    </div>
                </div>
                <div class="heading has-text-centered" v-if="view === 'installing'">
                    <h1 class="title">Installing...</h1>
                    <div class="block">
                        <a class="button is-dark is-loading" @click.prevent="">Begin</a>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Module</th>
                                <th>Message</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="mod in modules">
                                <td>
                                    {{mod.label}}
                                </td>
                                <td>
                                    {{mod.message}}
                                </td>
                                <td>
                                    {{mod.status}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ManageContainer from 'manage/components/layout/Container';

export default {
    name: 'manage-installation-index',
    data() {
        return {
            view: 'begin',
            modules: []
        }

    },
    methods: {
        install() {
            this.view = 'installing';
            this.$store.dispatch('daemon/actions/hasPython3').then((status) => {
                if (status === true) {
                    this.updateModule('python3', {
                        status: 'ready',
                        message: 'Installed'
                    });
                    this.$store.dispatch('daemon/actions/runIfDown').then((pid) => {
                        if (pid && parseInt(pid) > 0) {
                            this.updateModule('daemon', {
                                status: 'ready',
                                message: 'Installed'
                            });
                            this.$store.dispatch('daemon/actions/boot').then((status) => {
                                if (status.isBooted) {
                                    this.updateModule('environment', {
                                        status: 'ready',
                                        message: 'Installed'
                                    });
                                    if (status.isMigrated) {
                                        this.updateModule('database', {
                                            status: 'ready',
                                            message: 'Installed'
                                        });
                                    } else {
                                        this.$store.dispatch('daemon/actions/migrate', {name: 'repo'}).then((version) => {
                                            if (version && version > 0) {
                                                this.updateModule('repo_database', {
                                                    status: 'ready',
                                                    message: 'Installed'
                                                });
                                            } else {
                                                this.updateModule('repo_database', {
                                                    status: 'failed',
                                                    message: 'Cannot Migrate Database'
                                                });
                                            }
                                            this.$store.dispatch('daemon/actions/migrate', {name: 'local'}).then((version) => {
                                                if (version && version > 0) {
                                                    this.updateModule('local_database', {
                                                        status: 'ready',
                                                        message: 'Installed'
                                                    });
                                                } else {
                                                    this.updateModule('local_database', {
                                                        status: 'failed',
                                                        message: 'Cannot Migrate Database'
                                                    });
                                                }
                                            }).catch((error) => {
                                                console.log(error);
                                                this.updateModule('local_database', {
                                                    status: 'failed',
                                                    message: 'Cannot Migrate Database'
                                                });
                                            })
                                        }).catch((error) => {
                                            this.updateModule('repo_database', {
                                                status: 'failed',
                                                message: 'Cannot Migrate Database'
                                            });
                                        })
                                    }

                                }
                            })
                        }
                    }).catch((error) => {

                    })
                }
                // this.$store.dispatch('daemon/actions/runIfDown').then(() => {
                //     this.$store.dispatch('install/actions/installEnv').then(() => {
                //     })
                //     this.$store.dispatch('install/actions/migrate').then(() => {
                //     })
                // })
            }).catch((error) => {
                console.log(error);
                this.updateModule('python3', {
                    status: 'failed',
                    message: 'Please install python3 and place it in your path'
                })
            });
        },
        updateModule(name, options) {
            let mod = this.modules.find((mod) => {
                return mod.name === name;
            });

            console.log(mod.name);

            mod = Object.assign(mod, options);

            let index = this.modules.indexOf((m) => {
                console.log(m);
                return m.name === name
            })
            // this.modules = this.modules.splice(index, 1, mod);
            // console.log(this.modules);

        }
    },
    mounted() {
        this.modules = [];
        let mods = [
            {
                label: 'Python 3',
                name: 'python3',
                status: 'loading',
                message: 'Checking dependency...'
            },
            {
                label: 'Daemon',
                name: 'daemon',
                status: 'loading',
                message: 'Waiting...'
            },
            {
                label: 'Environment',
                name: 'environment',
                status: 'loading',
                message: 'Waiting...'
            },
            {
                label: 'Domain Datbase',
                name: 'repo_database',
                status: 'loading',
                message: 'Waiting...'
            },
            {
                label: 'User Database',
                name: 'local_database',
                status: 'loading',
                message: 'Waiting...'
            }
        ];

        mods.map((m) => {
            this.modules.push(m);
        })

    },
    components: {
        ManageContainer,
    }
}
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
