import Vue from 'vue'

export default {
    state: {
        name: '',
        pwd: '',
        dateTime: {}
    },
    mutations: {
        setUser(state, products) {
            state.name = products.name;
            state.pwd = products.pwd;
            state.dateTime = products.dateTime;
        }
    },
    actions: {
        setEncryptCode(context, products) {
            let CryptoJS = Vue.prototype.crypto;
            let data = {
                name: products.name,
                pwd: products.pwd,
                dateTime: Vue.prototype.global.$function.dateGet.getTimestamp()
            };
            let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'hjh1126123').toString();
            localStorage.setItem('key', ciphertext);
        },
        getDecryptCode(context) {
            let CryptoJS = Vue.prototype.crypto;
            let encryptCode = localStorage.getItem('key');
            let bytes = CryptoJS.AES.decrypt(encryptCode, 'hjh1126123');

            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            context.commit('setUser', {
                name: decryptedData.name,
                pwd: decryptedData.pwd,
                dateTime: decryptedData.dateTime
            });
        }
    }
}