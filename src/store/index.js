import { defineStore } from 'pinia';

export const useStore = defineStore('baseStore', {
  state: () => ({
    count: 0,
    userToken: null,
  }),
  actions: {
    setUserToken(token) {
      this.userToken = token;
    },
    async login(username, password) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      this.setUserToken('thisFileIsJustForDemo--byQwei79');
    },
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
  getters: {
    isLoggedIn() {
      return!!this.userToken;
    },
  },
  persist: { // 开启qstorage持久化
    enabled: true, // 开启持久化
    strategies: [ // 持久化策略
      {
        key: 'baseStore', // 持久化的key
        storage: window.localStorage, // 持久化的storage
        paths: ['userToken'], // 需要持久化的state
      },
    ],
  },
});