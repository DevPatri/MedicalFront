<template>
    <div>
        <img src="@/assets/img/logo2.webp" alt="logo">
        <h1>Health dates</h1>
        <div class="logger">
            <router-link v-show="!token" to="login">Login</router-link>
            <router-link v-show="!token" to="register">Register</router-link>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { useAuthStore } from '@/Auth/AuthStore';
import { computed } from 'vue';

const authStore = useAuthStore();
const token = computed(() => authStore.token)

</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 4rem;
        font-weight: 700;
        margin: 1rem 0 0 0;
    }

    img {
        margin-top: 6rem;
        width: 300px;
        height: 300px;
    }
}

.logger {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 2rem;
    
    a{
        margin: 0 1rem;
        text-decoration: none;
        width: 120px;
        height: 35px;
        line-height: 35px;
        background-color: rgb(40, 154, 68);
        color: white;
        border-radius: 5px;
    }
    
}
</style>