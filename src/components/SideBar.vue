<template>
    <div class="sidebar">
        <h3>Opciones</h3>
        <div>
            <RouterLink to="/crear-cita">Crear cita</RouterLink>
            <RouterLink to="/crear-paciente">Crear paciente</RouterLink>
            <RouterLink to="/crear-medico">Crear m&eacute;dico</RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.sidebar {
    height: 8vh;
    margin-top: 10px;
    background-color: #bce2d1;
    color: white;
    padding: 10px;
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;



    h3 {
        position: sticky;
        top: 20px;
        font-size: 2rem;
    }

    div {
        position: sticky;
        top: 85px;
        padding-left: 30px;
        display: flex;
        flex-direction: row;
        h3{
            margin-right: 20px;
        }
        a {
            cursor: pointer;
            font-size: clamp(0.8rem, 1.5vw, 1rem);
            max-width: 100px;
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
        justify-content: start;
        height: 100%;

    }
}
</style>