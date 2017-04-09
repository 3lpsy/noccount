<template>
    <div>
        <app-container>
            <div class="container">
                <p>home</p>
            </div>
        </app-container>
    </div>
</template>

<script>
import AppContainer from 'common/components/layout/Container';
export default {
    name: 'home-index',
    data() {
        return {}
    },
    methods: {
    },
    components: {
        AppContainer
    }
}
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
