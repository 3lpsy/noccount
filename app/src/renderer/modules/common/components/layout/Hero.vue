<template lang="html">
    <section class="hero is-small is-primary is-bold has-text-centered">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Exterminate
                </h1>
            </div>
        </div>
        <div class="hero-foot">
            <nav class="tabs is-centered">
                <ul>
                    <li class="is-active">
                        <router-link :to="{name: 'home.index'}" :class="{'is-action':  $route.name.includes('home')}">
                            Overview
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'mbox.index'}" :class="{'is-action': $route.name.includes('mbox')}">
                            Mbox
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'imap.index'}" :class="{'is-action':  $route.name.includes('imap')}">
                            Imap
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
