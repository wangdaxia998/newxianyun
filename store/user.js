export const state = () => {
    return {
        userInfo: {
            user: {}
        }
    }
}
export const mutations = {
    getuser(state, data) {
        state.userInfo = data
    }
}
export const actions = {
    login(store, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            let data = res.data;
            store.commit("getuser", data);
            // console.log(this.$store);
        });
    },
    // 发送手机验证码
    code(store, data) {
        return this.$axios({
            url: '/captchas',
            method: 'POST',
            data: { tel: data }
        })
    },
    //注册登录
    register(store, data) {
        return this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data
        }).then(res => {
            console.log(res);

            const { data } = res
            store.commit('getuser', data)
        })
    },
    // 实时机票

}

