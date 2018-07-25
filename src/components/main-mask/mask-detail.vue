<template>
    <transition name="fade">

    </transition>
</template>
<script>
export default {
    computed: {
        count() {
            return this.$store.state.isShowDetail;
        },
        content() {
            return this.$store.state.DetailContent;
        }
    }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
