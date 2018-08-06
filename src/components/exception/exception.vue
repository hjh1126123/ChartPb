<template>
    <v-container grid-list-md text-xs-center class="pt-1">
        <v-layout row wrap>
            <v-flex v-for="(item,index) in tabList" :key="index" xs12 sm3>
                <v-card>
                    <v-container grid-list-md text-xs-center text-sm-center class="pa-2">
                        <v-layout row wrap>
                            <v-flex xs6 sm6>
                                <div>{{item.STName}}</div>
                            </v-flex>
                            <v-flex xs6 sm6>
                                <div>{{item.Total}}件</div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-container grid-list-md text-xs-center class="pa-2">
                            <v-layout row wrap>
                                <v-flex xs12 sm6>
                                    <v-btn block>
                                        <v-icon left>assessment</v-icon>
                                        {{item.Dif}}件
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-btn block>
                                        <v-icon left color="deep-orange accent-3"
                                                v-if="item.Rise === 'rise'">trending_up
                                        </v-icon>
                                        <v-icon left color="light-green darken-2"
                                                v-if="item.Rise === 'decline'">trending_down
                                        </v-icon>
                                        <v-icon left color="cyan accent-3"
                                                v-if="item.Rise === 'nochange'">trending_flat
                                        </v-icon>
                                        {{item.Percentage}}%
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12 sm12>
                                    <v-progress-linear
                                            height="5"
                                            :value="item.Percentage"
                                    ></v-progress-linear>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <index ref="content"></index>
    </v-container>
</template>
<script>
    import index from './child/index'

    export default {
        data() {
            return {
                width: 0,
                tabList: [],
                totalTab: {}
            };
        },
        created() {

        },
        mounted() {
            this.getTabs();
        },
        methods: {
            getTabs() {
                let $ = this;
                this.$store.state.requests.push($.$http
                    .post($.apiUrl + "/Ex/GetExPackageCount_Today")
                    .then(res => {
                        let data = res.data;
                        if (data.length > 0) {
                            $.tabList = data;
                            let items = [];
                            data.forEach((item, index) => {
                                let tmpItem = {
                                    text: '导航至' + item.STName,
                                    icon: 'router',
                                    action: () => {
                                        $.$refs.content.bindData(index + 1);
                                    }
                                };
                                items.push(tmpItem);
                            });
                            $.$emit('setRightNav', items);
                        }
                    }));
            }
        },
        directives: {
            goto: {}
        },
        components: {
            index
        }
    };
</script>
<style lang="stylus">

</style>
