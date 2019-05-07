<template>
    <transition name="fade">
        <div class="loadingContent" v-if="loading">
            <v-progress-circular
                    :size="size"
                    :width="width"
                    color="accent"
                    class="loading"
                    indeterminate>
                <h3 :style="{'font-size': fontSize + 'em'}">{{text}}</h3>
            </v-progress-circular>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "loading",
        data() {
            return {}
        },
        methods: {},
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            size: {
                type: Number,
                default: 300
            },
            width: {
                type: Number,
                default: 15
            },
            fontSize: {
                type: Number,
                default: 1.4
            },
            text: {
                type: String,
                default: '页面数据载入中'
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
    .loadingContent {
        position: absolute
        margin: auto;
        left 0;
        right 0;
        top 0;
        bottom 0;
        z-index 2;
        background-color: rgba(0, 0, 0, 0.51)
        .loading {
            position: absolute;
            margin: auto;
            left 0;
            right 0;
            top 0;
            bottom 0;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>