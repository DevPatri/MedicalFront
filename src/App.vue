<template>
  <NavBar />
  <main :class="{ 'full-width': !token, 'no-side-bar': token }">
    <SideBar v-if="token" />
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


html, body{
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  margin: 0;
  min-height: 100vh;
  font-family: 'Titillium Web', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/wallpaper.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  filter: blur(2px);
  z-index: -1;
}

@media (min-width:720px) {
  .no-side-bar {
    display: grid;
    grid-template-columns: 0.5fr 4fr;
  }

  .full-width {
    height: calc(90vh - 81px);
    display: grid;
    place-items: center;
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
