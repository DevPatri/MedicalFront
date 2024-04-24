<template>
    <ul class="list" v-if="medicos">
        <li v-for="medico in medicos" v-bind:key="medico.numColegiado">
            <div>
                <h3>{{ medico.nombre }}</h3>
                <p>{{ medico.apellidos }}</p>
            </div>
            <p><strong>Número de colegiado: </strong>{{ medico.numColegiado }}</p>
            <div class="btns">
                <router-link class="bt-diag" :to="{ name:'medico', params: { numColegiado: medico.numColegiado }}">Detalle</router-link>
                <a @click="eliminarMedico(medico.numColegiado)" class="bt-elim">Eliminar</a>
            </div>

        </li>
    </ul>
</template>
<script lang="ts">
import { Medico } from '@/interfaces/Medico';
import MedicosListService from '@/services/MedicosService';
import { onBeforeMount, ref } from 'vue';
export default {
    name: 'ListMedicos',
    setup() {
        const service = new MedicosListService();
        const medicos = ref<Medico[]>([]);

        onBeforeMount(async () => {
            const fetchedMedicos = await service.fetchMedicos();
            medicos.value = fetchedMedicos;
        });

        const eliminarMedico = async (id: string) => {
            try {
                await service.deleteMedicos(id);
                const fetchedMedicos = await service.fetchMedicos();
                medicos.value = fetchedMedicos;
            } catch (error) {
                console.error("fallo al borrar el médico", error);
            }
        }
        return {
            medicos,
            eliminarMedico
        }
    }
}
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
        grid-template-columns: repeat(3, 1fr);
        justify-content: start;
        align-items: center;
        margin: 0 40px;
        padding: 15px;
        background-color: #bce2d1;
        border-radius: 5px;
        border: 1px solid white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        div{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        h3,
        p {
            margin: 0;
            padding: 0 1rem;
        }
    }
    .btns {
        justify-self: flex-end;
    }
    .bt-elim {
        background-color: none;
        justify-self: flex-end;
        color: red;
        font-weight: bold;
        text-decoration: none;
    }

    .bt-diag {
        color: rgb(62, 62, 199);
        font-weight: bold;
        text-decoration: none;
        margin-right: 10px;
    }
}
</style>