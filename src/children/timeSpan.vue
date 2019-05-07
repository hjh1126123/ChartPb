<template>
    <div class="clock">
        <span class="text">{{tmpText}}</span>
    </div>
</template>

<script>
    export default {
        name: "timeSpan",
        data() {
            return {
                interval: '',
                time: '',
                date: '',
                tmpText : '',
                week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
            }
        },
        methods: {
            updateTime() {
                if (this && !this._isDestroyed) {
                    let cd = new Date();
                    this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
                    this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' [' + this.week[cd.getDay() - 1] + ']';
                    cd = null;
                }
            },
            zeroPadding(num, digit) {
                let zero = '';
                for (let i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            }
        },
        watch: {
            text(value) {
                if (value) {
                    this.tmpText = value.replace(/{date}/g, this.date).replace(/{time}/g, this.time);
                }
            },
            date(value){
                this.tmpText = this.text.replace(/{date}/g, this.date).replace(/{time}/g, this.time);
            },
            time(value){
                this.tmpText = this.text.replace(/{date}/g, this.date).replace(/{time}/g, this.time);
            }
        },
        props: {
            showDate: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: '400'
            }
        },
        beforeCreate() {

        },
        created() {
            this.updateTime();
        },
        beforeMount() {
        },
        mounted() {
            this.$nextTick(() => {
                this.interval = setInterval(this.updateTime, 1000);

                if(this.text){
                    this.tmpText = this.text.replace(/{date}/g, this.date).replace(/{time}/g, this.time);
                }
            });
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
            if (this.interval)
                window.clearInterval(this.interval);
        },
        destroyed() {
        }
    }
</script>

<style lang="stylus">
    .clock {
        font-family: 'Share Tech Mono', monospace;
        text-align: center;
        color: #daf6ff;
        text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
        .time {
            letter-spacing: 0.05em;
            font-size: 10px;
            padding-left 20px;
        }
        .date {
            letter-spacing: 0.1em;
            font-size: 10px;
        }
        .text {
            letter-spacing: 0.1em;
            font-size: 12px;
        }
    }
</style>