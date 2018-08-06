<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12 card" :style="cardBackground">
                            <v-toolbar v-bind:dark="!dark">
                                <v-toolbar-title>海带宝监控系统</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-alert
                                        :value="alert"
                                        :type="alertType"
                                        transition="scale-transition"
                                        dismissible
                                        outline
                                >
                                    {{alertText}}
                                </v-alert>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form">
                                    <v-text-field
                                            v-bind:dark="dark"
                                            prepend-icon="person"
                                            v-model="username"
                                            :rules="nameRules"
                                            :counter="10"
                                            label="用户名"
                                            required>
                                    </v-text-field>
                                    <v-text-field
                                            v-bind:dark="dark"
                                            prepend-icon="lock"
                                            v-model="password"
                                            :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                                            :rules="[rules.required]"
                                            :type="showPwd ? 'text' : 'password'"
                                            name="input-10-1"
                                            label="密 码"
                                            counter
                                            @click:append="showPwd = !showPwd"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        outline
                                        :loading="btnLoading"
                                        :disabled="btnLoading"
                                        v-bind:dark="dark"
                                        @click.native="login"
                                >
                                    登录
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <div class="videoContain">
            <video loop v-if="showVideo" muted ref="my_video" preload="metadata" class="videoStyle"
                   v-on:canplay="canplay">
                <source src="../../assets/video/stock-footage-growing-charts-white-black-financial-figures-and-diagrams-showing-increasing-profits-two-colors-to.webm"
                        type="video/webm"/>
            </video>
        </div>
    </v-app>
</template>
<script>
    import qs from "qs";

    export default {
        data: () => ({
            username: "",
            password: "",
            alert: false,
            alertText: '',
            alertType: 'warning',
            cardBackground: 'background-color: rgba(0,121,255,0.04);',
            showPwd: false,
            nameRules: [
                v => !!v || '不能为空',
                v => (v && v.length <= 10) || '名称必须小于10个字符'
            ],
            rules: {
                required: value => !!value || '不能为空.'
            },
            dark: false,
            vedioCanPlay: false,
            btnLoading: false,
            showVideo: true
        }),
        mounted: function () {
            let $ = this;
            if ($.global.judge.global.isMobile()) {
                $.showVideo = false;
                $.dark = true;
            } else {
                let myVid = $.$refs.my_video;
                myVid.play();
                myVid.ontimeupdate = function () {
                    if (this.currentTime > 15) {
                        $.dark = true;
                        $.alertType = 'error';
                        $.cardBackground = 'background-color: rgba(0,121,255,0.2);';
                    } else {
                        $.dark = false;
                        $.alertType = 'warning';
                        $.cardBackground = 'background-color: rgba(0,121,255,0.04);';
                    }
                };
            }

        },
        created() {
            let that = this;
            document.onkeydown = function (e) {
                let keyNum = window.event ? e.keyCode : e.which;
                if (keyNum === 13) {
                    that.login();
                }
            };
        },
        methods: {
            login() {
                let $ = this;
                if ($.$refs.form.validate()) {
                    $.btnLoading = true;
                    let data = {
                        userCode: $.username,
                        pwd: $.password
                    };
                    $.$store.state.isShowLoading = true;
                    $.$http
                        .post($.apiUrl + "/User/Check?" + qs.stringify(data))
                        .then(res => {
                            let data = res.data;
                            if (data.Check) {
                                sessionStorage.setItem("accessToken", true);
                                sessionStorage.setItem("userName", this.username);
                                $.$router.push({
                                    path: "/index"
                                });
                            } else {
                                $.btnLoading = false;
                                $.myAlert(data.Msg);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            $.myAlert('网络错误');
                            $.btnLoading = false;
                        });
                }
            },
            myAlert(text) {
                let $ = this;
                if (!$.alert)
                {
                    $.alert = true;
                    $.alertText = text;
                }
                else {
                    $.alert = false;
                    setTimeout(() => {
                        $.alert = true;
                        $.alertText = text;
                    },500);
                }
            },
            canplay() {
                this.vedioCanPlay = true
            }
        },
        watch: {

        }
    };
</script>
<style lang="stylus">
    .card
        position: relative;
        z-index: 1;

    .videoContain
        display: inline;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 0;
        background: black;
        .videoStyle
            object-fit: fill;
            width: 100%;
            height: 100%;
</style>

