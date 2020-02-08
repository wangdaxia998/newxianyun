export const state = {
     userInfo: {
        user: {}
    }
}
export const mutations = {
    getuser(state, data) {
        state.userInfo = data
    }
}
export const actions = {
    login(store,data) {
       return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            let data = res.data;
            store.commit("getuser", data);
            // console.log(this.$store);
        });
    }
}