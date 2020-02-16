export const state = () => {
    return {
        airs: []
    }
}

export const mutations = {
    airData(state,data){
        state.airs.unshift(data)
        state.airs.length = 5
    }
}