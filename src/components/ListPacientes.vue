<template>
    <ul class="list" v-if="pacientes">
        <li v-for="paciente in pacientes" v-bind:key="paciente.nss">
            <h3>{{ paciente.nombre + ' ' + paciente.apellidos }}</h3>
            <p><strong>NSS: </strong>{{ paciente.nss }}</p>
            <div class="btns">
                <router-link class="bt-diag" :to="{ name:'paciente', params: { nss:paciente.nss } }">Detalle</router-link>
                <a class="bt-elim" @click="eliminarPaciente(paciente.nss)">Eliminar</a>
            </div>
        </li>
    </ul>
</template>
<script lang="ts">
import PacientesListService from '@/services/PacientesService'
import { onBeforeMount, ref } from 'vue'
import { Paciente } from '@/interfaces/Paciente'

export default {
    name: 'ListPacientes',
    setup() {
        const service = new PacientesListService()
        const pacientes = ref<Paciente[]>([])

        //llamamos al servicio para obtener los pacientes antes de que se monte el componente
        onBeforeMount(async () => {
            const fetchedPacientes = await service.fetchPacientes()
            pacientes.value = fetchedPacientes.sort((a, b) => a.nombre.localeCompare(b.nombre))
        });
        // función que llama al servicio para eliminar un paciente
        const eliminarPaciente = async (nss: string) => {
            try {
                await service.deletePacientes(nss);
                const fetchedPacientes = await service.fetchPacientes();
                pacientes.value = fetchedPacientes;
            } catch (error) {
                console.error("fallo al borrar el paciente", error);
            }
        }
        return { pacientes, eliminarPaciente }
    },
};
</script>

<style scoped>
.list {
    display: grid;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 55em;

    li {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-content: start;
        align-items: center;
        margin: 0 40px;
        padding: 15px;
        background-color: #bce2d1;
        border-radius: 5px;
        border: 1px solid white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        h3,
        p {
            margin: 0;
            padding: 0 1rem;
        }
        h3{
            grid-column: span 2;
        }
        p:nth-child(2){
            justify-self: flex-start;
        }
        p:nth-child(3){
            grid-column: span 2;
        }
        p:nth-child(4){
            justify-self: flex-start;
        }
        
    }

    .btns {
        justify-self: flex-end;
    }

    .bt-elim {
        cursor: pointer;
        color: red;
        font-weight: bold;
        text-decoration: none;
    }

    .bt-diag {
        cursor: pointer;
        margin-right: 10px;
        color: rgb(62, 62, 199);
        font-weight: bold;
        text-decoration: none;
    }
}
</style>