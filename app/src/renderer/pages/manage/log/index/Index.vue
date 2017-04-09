<template>
    <div>
        <manage-container>
            <div class="container">
                <p>Logs</p>
            </div>
        </manage-container>
    </div>
</template>

<script>
import ManageContainer from 'manage/components/layout/Container';

export default {
    name: 'settings-index',
    data() {
        return {}

    },
    methods: {
    },
    components: {
        ManageContainer
    }
}
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
