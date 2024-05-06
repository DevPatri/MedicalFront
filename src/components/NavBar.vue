<template>
    <nav>
        <router-link to="/"><img src="../assets/img/logo2.webp" alt="logo"></router-link>
        <div class="links" v-show="token">
            <router-link to="/">Home</router-link>|
            <router-link to="citas">Citas</router-link>
            <router-link to="pacientes">Pacientes</router-link>
            <router-link to="medicos">Medicos</router-link>
        </div>
        <div>
            <button v-show="token" @click="logout">Logout</button>
        </div>
    </nav>
</template>
<script lang="ts" setup>

import { useAuthStore } from '@/Auth/AuthStore';
import router from '@/router'; 
import { computed } from 'vue';

const authStore = useAuthStore();
const token = computed(() => authStore.token)

const logout = () => {
    authStore.setToken('');
    router.push('login');
}


</script>
<style scoped>
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    background-color: #dbdbdb;
    padding: 0;
    border-radius: 5px;

    .links {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
}
nav a {
    padding: 0 10px;
    margin-right: 10px;
    text-decoration: none;
}

nav a.active {
    font-weight: bold;
}

img {
    margin: 0;
    width: 75px;
    height: 75px;
}
button{
            text-decoration: none;
            margin-right: 40px;
            width: 60px;
            height: 30px;
            background-color: rgb(40, 154, 68);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
</style>