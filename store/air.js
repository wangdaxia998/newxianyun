export const state = () => {
    return {
        airs: [],
        orderDetail: {
            seat_infos: {}
        },
        allprice:0
    }
}

export const mutations = {
    airData(state, data) {
        state.airs.unshift(data)
        if (state.airs.length > 5) {
            state.airs.length = 5
        }

    },
    //订单页侧边栏渲染
    orderData(state, data) {
        state.orderDetail = data
    },
    price(state,data){
        state.allprice = data
    }
}