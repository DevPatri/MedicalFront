<template>
    <ul class="list" v-if="medicos">
        <li v-for="medico in medicos" v-bind:key="medico.numColegiado">
            <h3>{{ medico.nombre }}</h3>
            <p>{{ medico.apellidos }}</p>
            <p><strong>Número de colegiado: </strong>{{ medico.numColegiado }}</p>
            <p></p>
            
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
            // console.log(medicos.value)
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
    list-style: none;
    padding: 0;
    margin: 0 auto;
    width: 70vw;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;

        h3, p {
            margin: 0;
            padding: 0 1rem;
        }
    }
    .bt-elim {
        justify-self: flex-end;
        color: red;
        font-weight: bold;
        text-decoration: none;
    }
    .bt-diag {
        color: rgb(62, 62, 199);
        font-weight: bold;
        text-decoration: none;
    }
}
</style>