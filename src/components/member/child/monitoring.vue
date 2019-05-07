<template>
    <v-container grid-list-md>
        <v-layout row wrap style="min-height: 200px;">
            <v-flex xs12 sm4>
                <monitoringPanel :mItem="MemberMonthGoIsOk"></monitoringPanel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import monitoringPanel from '../../../children/monitoringPanel'

    export default {
        name: "monitoring",
        data() {
            return {
                urlMemberMonthGoIsOk: `${this.apiUrl}/Member/MemberMonthGoIsOk`,

                MemberMonthGoIsOk: {}
            }
        },
        methods: {
            MemberMonthGoIsOkPost: function () {
                return this.$http.get(this.urlMemberMonthGoIsOk)
            }
        },
        props: {},
        components: {
            monitoringPanel
        },
        mounted() {
            let $ = this;
            $.$nextTick(() => {
                let tmpPosts = [
                    $.MemberMonthGoIsOkPost()
                ];
                this.$http.all(tmpPosts).then(this.$http.spread((MMGIOP) => {
                    let MMGIOPData = MMGIOP.data[0];
                    $.MemberMonthGoIsOk = {
                        title: '月结会员数',
                        success: !MMGIOPData.Error,
                        error: MMGIOPData.Msg,
                        child: [
                            {
                                name: `月结用户数:${MMGIOPData.Name}`,
                                value: ''
                            }
                        ]
                    };
                    this.$emit('closeLoad');
                }));
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