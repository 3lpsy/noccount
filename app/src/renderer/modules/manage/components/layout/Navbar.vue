<template lang="html">
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
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
