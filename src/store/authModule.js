export const authModule = {
    state: () => ({
        address: '',
        role: '',
        isAuth: false,
    }),
    getters: {
        isAuth: state => state.isAuth,
        address: state => state.address,
        role: state => state.role
    },
    mutations: {
    setAuth(state, {isAuth, role, address}) {
        state.isAuth = isAuth;
        state.role = role;
        state.address = address;

    }
    },
    actions: {
    async login({commit}) { 
        try {
        const address = await window.ethereum.request({method: 'eth_requestAccounts'});
        commit('setAuth', {isAuth: true, role: 'user', address: address[0]});
        } 
        catch(error) {
            console.log(error);
        }
    }
    },
}