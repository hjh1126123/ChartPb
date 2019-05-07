<template>
    <div v-if="mItem" :class="{stickySuccess : mItem.success , stickyError : !mItem.success}">
        <h2>{{mItem.title}}</h2>
        <hr/>
        <v-container grid-list-md>
            <v-layout row wrap v-for="(item,index) in mItem.child" :key="index" class="pt-2">
                <v-flex sm6 xs6 class="pa-0">
                    <div :class="{ 'x-signSuccess' : item.success, 'x-signError' : (!item.success && item.success !== undefined), 'x-signInfo' : item.success === undefined }">
                        {{item.name}}
                    </div>
                </v-flex>
                <v-flex sm6 xs6 class="pa-0 text-xs-right">
                    <div :class="{ 'x-signSuccess' : item.success, 'x-signError' : (!item.success && item.success !== undefined), 'x-signInfo' : item.success === undefined }">
                        {{item.value}}
                    </div>
                </v-flex>
            </v-layout>
            <v-layout class="pt-4" v-if="!mItem.success">
                <v-flex sm12 xs12 class="pa-0">
                <v-alert
                        :value="true"
                        type="error">
                    {{mItem.error}}
                </v-alert>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>

<script>
    export default {
        name: "monitoringPanel",
        data() {
            return {}
        },
        methods: {},
        props: {
            mItem: {
                type: Object,
                default: {}
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        destroyed() {
        }
    }
</script>

<style lang="stylus">
    .tooltip {
        background-color white;
    }

    .stickySuccess {
        width 100%;
        height auto;
        border 1px #c9ffe1 solid;
        box-shadow: 0 0 10px #84ffa5;
        h2 {
            text-align center;
        }
    }

    .stickyError {
        width 100%;
        height auto;
        border 1px #ffaea3 solid;
        box-shadow: 0 0 10px #ff525c;
        h2 {
            text-align center;
        }
    }

    .x-signSuccess {
        text-shadow: 0 0 1px #00e765, 0 0 1px #00e765, 0 0 1px #00e765, 0 0 1px #00e765;
        font-size 140%;
    }

    .x-signError {
        text-shadow: 0 0 1px #e72345, 0 0 1px #e72345, 0 0 1px #e72345, 0 0 1px #e72345;
        font-size 140%;
    }

    .x-signInfo {
        text-shadow: 0 0 1px #9be7e2, 0 0 1px #9be7e2, 0 0 1px #9be7e2, 0 0 1px #9be7e2;
        font-size 140%;
    }
</style>