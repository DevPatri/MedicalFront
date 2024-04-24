<template>
    <div>
        <h2>Crear paciente</h2>
        <form>
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" v-model="paciente.nombre" id="nombre" required>
            </div>
            <div>
                <label for="apellidos">Apellidos:</label>
                <input type="text" v-model="paciente.apellidos" id="apellidos" required>
            </div>
            <div>
                <label for="usuario">Usuario:</label>
                <input type="text" v-model="paciente.usuario" id="usuario" required>
            </div>
            <div>
                <label for="clave">Clave:</label>
                <input type="password" v-model="paciente.clave" id="clave" required>
            </div>
            <div>
                <label for="nss">NSS:</label>
                <input type="text" v-model="paciente.nss" id="nss" required>
            </div>
            <div>
                <label for="telefono">Teléfono:</label>
                <input type="text" v-model="paciente.telefono" id="telefono" required>
            </div>
            <div>
                <label for="direccion">Dirección:</label>
                <input type="text" v-model="paciente.direccion" id="direccion" required>
            </div>
            <div> <label for="numTarjeta">Número de tarjeta:</label>
                <input type="text" v-model="paciente.numTarjeta" id="numTarjeta" required>
            </div>
            <a @click="crearPaciente">Crear paciente</a>
        </form>
    </div>

</template>

<script lang="ts">
import { Paciente } from '@/interfaces/Paciente';
import router from '@/router';
import PacientesListService from '@/services/PacientesService';
import { Ref, defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CrearPaciente',
    setup() {
        const pacienteService = new PacientesListService()
        const paciente: Ref<Paciente> = ref({
            nombre: '',
            apellidos: '',
            nss: '',
            usuario: '',
            clave: '',
            telefono: '',
            direccion: '',
            numTarjeta: ''
        })
        async function crearPaciente() {
            try {
                await pacienteService.createPaciente(paciente.value)
                router.push({ name: 'pacientes' })
            } catch (error) {
                console.error('Error al crear el paciente.', error)
            }
        }
        return {
            paciente,
            crearPaciente
        }
    }
})
</script>

<style scoped>
div {
    margin-top: 80px;
    form {
        padding: 10px;
        max-width: 40em;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        justify-items: center;
        margin: 10px auto 0 auto;
        text-align: left;
        div{
            margin: 0;
            display: flex;
            flex-direction: column;
        }

        input {
            outline: none;
            border: none;
            border-radius: 5px;
            padding: 2px;
            width: 15em;
            height: 2em;
            margin-bottom: 10px;
            background-color: rgb(182, 182, 182);

        }

        label {
            text-align: left;
        }

        a {
            text-align: center;
            justify-self: center;
            border: none;
            margin-top: 20px;
            width: 200px;
            cursor: pointer;
            background-color: rgb(100, 167, 116);
            padding: 4px 12px;
            border-radius: 5px;
            margin-right: 30px;
            font-size: 1.2rem;
            font-weight: bold;
            color: rgb(255, 255, 255);
            grid-column: span 2;
        }
    }
}
</style>