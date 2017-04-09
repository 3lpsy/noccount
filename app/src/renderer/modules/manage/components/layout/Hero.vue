<template lang="html">
    <section class="hero is-small is-primary has-text-centered">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Manage
                </h1>
            </div>
        </div>
        <div class="hero-foot">
            <nav class="tabs is-centered">
                <ul>
                    <li class="is-active">
                        <router-link
                            :to="{name: 'manage.install.index'}"
                            :class="{'is-action':  $route.name.includes('install')}">
                            Installation
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'manage.status.index'}"
                            :class="{'is-action': $route.name.includes('status')}">
                            Status
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'manage.settings.index'}"
                            :class="{'is-action': $route.name.includes('settings')}">
                            Settings
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'manage.log.index'}"
                            :class="{'is-action':  $route.name.includes('log')}">
                            Log
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
