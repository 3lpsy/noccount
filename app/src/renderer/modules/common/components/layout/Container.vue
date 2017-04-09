<template>
    <div>
        <app-navbar></app-navbar>
        <app-hero></app-hero>
        <app-subnav></app-subnav>
        <slot></slot>
    </div>
</template>

<script>
import AppNavbar from "common/components/layout/Navbar";
import AppSubnav from "common/components/layout/Subnav";
import AppHero from "common/components/layout/Hero";

export default {
    components: {
        AppNavbar,
        AppHero,
        AppSubnav
    }
}
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
