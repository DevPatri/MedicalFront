<template>
    <div class="sidebar">
        <h3>Opciones</h3>
        <div>
            <RouterLink to="/crear-cita">Crear cita</RouterLink>
            <!-- <a href="#">Crear cita</a> -->
            <a href="#">Crear paciente</a>
            <a href="#">Crear medico</a>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.sidebar {
    /* position: fixed;
        top: 0;
        left: 0; */
    height: 10vh;
    margin-top: 10px;
    background-color: #bce2d1;
    color: white;
    padding: 10px;
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;



    h3 {
        font-size: 2rem;
    }

    div {
        padding-left: 30px;
        display: flex;
        flex-direction: row;

        a {
            width: 100px;
            color: #42b983;
            text-decoration: none;
            padding: 8px 10px;
            margin: 5px;
            border-radius: 5px;
            background-color: white;
            opacity: 0.8;
            border: 1px solid white;
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }
    }
    @media (min-width: 720px) {
        div {
            flex-direction: column;
            padding-left: 0;
        }    
    }
}
@media (min-width: 720px) {
    .sidebar {
        flex-direction: column;
        height: 100vh;

    }
}
</style>