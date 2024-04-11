import {contract} from '@/services/services';

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
            const addresses = await window.ethereum.request({method: 'eth_requestAccounts'});

            contract.methods.getYourSelfData().call({'from': addresses[0]})
            .then((object) => {
                let roleValue = object.role;
                commit('setAuth', {isAuth: true, role: roleValue, address: addresses[0]});
                localStorage.setItem(addresses[0], JSON.stringify(roleValue));
                });
            } 
            catch(error) {
                console.log(error);
            }
        },

        async loadAuthData({commit}) {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            if(accounts) {
                const userData = localStorage.getItem(accounts[0]);
                if (userData) {
                    const role = JSON.parse(userData);
                    commit("setAuth", {isAuth: true, role, address: accounts[0]});
                }
            }
        }
    },
}