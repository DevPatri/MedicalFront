<template>
    <nav>
        <router-link to="/"><img src="@/assets/img/logo2.webp" alt="logo"></router-link>
        <div class="links">
            <router-link to="/">Home</router-link>|
            <router-link to="/citas">Citas</router-link>
            <router-link to="/pacientes">Pacientes</router-link>
            <router-link to="/medicos">Medicos</router-link>
        </div>
    </nav>
</template>
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
</style>