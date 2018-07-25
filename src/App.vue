<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>


<script>
import Loading from "./children/loading";
export default {
    name: "App",
    components: {
        Loading
    }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
