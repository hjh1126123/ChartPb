<template>
    <router-view @closeLoad="closeLoad"></router-view>
</template>

<script>
    export default {
        name: "index",
        methods: {
            closeLoad() {
                this.$emit('closeLoad');
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>