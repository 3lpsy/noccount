<template>
    <div>
        <manage-navbar></manage-navbar>
        <manage-hero></manage-hero>
        <slot></slot>
    </div>
</template>

<script>
import ManageNavbar from "manage/components/layout/Navbar";
import ManageHero from "manage/components/layout/Hero";

export default {
    components: {
        ManageNavbar,
        ManageHero,
    }
}
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
