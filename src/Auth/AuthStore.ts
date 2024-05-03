/* 
    ? Define a store for the authentication token 
*/

import { defineStore } from 'pinia';
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: ''
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    }
  }
});
