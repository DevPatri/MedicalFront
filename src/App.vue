<template>
  <NavBar />
  <main>
    <SideBar :style="{ visibility: token ? 'visible' : 'hidden'}" />
    <router-view />
  </main>
</template>
<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import { useAuthStore } from '@/Auth/AuthStore';
import { computed } from 'vue';


const authStore = useAuthStore();
const token = computed(() => authStore.token)

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');

#app {
  font-family: 'Titillium Web', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media (min-width:720px) {
  main {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
