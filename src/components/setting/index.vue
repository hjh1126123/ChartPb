<template>
    <div>
        <v-flex v-for="(item,k) in buttons" :key="k" xs4 class="ml-2">
            <v-btn block @click="select(item)" :color="item.status">{{item.name}}</v-btn>
        </v-flex>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "index",
        data() {
            return {
                buttons: [
                    {
                        year: '2019',
                        name: '2019年',
                        status: 'error'
                    },
                    {
                        year: '2018',
                        name: '2018年',
                        status: 'primary'
                    }
                ]
            }
        },
        methods: {
            ...mapActions({
                setYear: 'setYear'
            }),
            select(item) {
                this.setYear(item.year);
                this.init();
            },
            init(){
                let btn = this.buttons.filter(fr => fr.year === this.this_year);
                this.buttons.forEach(item => {
                    if(item === btn[0]){
                        item.status = 'error';
                    }else{
                        item.status = 'primary';
                    }
                })
            }
        },
        props: {},
        filters: {},
        components: {},
        computed: {
            ...mapState({
                this_year: (state) => state.app.this_year
            })
        },
        mounted() {
            this.$nextTick(() => {
                this.init();
                this.$emit('closeLoad');
            });
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

</style>