<template lang="html">
    <div>
        <nav class="nav  has-shadow">
            <div class="nav-left">
                <router-link
                    :to="{name: 'home.index'}"
                    class="nav-item">
                    Home
                </router-link>
            </div>
            <span class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </span>
            <div class="nav-right nav-menu">
                <router-link :to="{name: 'home.index'}" class="nav-item">
                    App
                </router-link>
                <router-link :to="{name: 'manage.index'}" class="nav-item">
                    Manage
                </router-link>
                <router-link :to="{name: 'test.index'}" class="nav-item">
                    Test
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
                <div class="heading has-text-centered">
                    <h1>What we have here is a failure to communicate.</h1>
                    <p class="block">
                        <a href="#" @click.prevent="restartDaemon" class="button is-dark">
                            Restart Daemon
                        </a>
                    </p>
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
        }
    },
    methods: {
        restartDaemon() {

        }
    },
    mounted() {
    },
    components: {
    },
}
</script>

<style lang="css">
</style>
