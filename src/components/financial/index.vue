<template>
    <router-view @closeLoad="closeLoad"></router-view>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {}
        },
        methods: {
            closeLoad() {
                this.$emit('closeLoad');
            }
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        }
    }
</script>

<style lang="stylus">

</style>