<template>
    <ul class="citas-list" v-if="citas">
        <li v-for="cita in citas" v-bind:key="cita.id">
            <h3>{{ formatDate(cita.fechaHora) }}</h3>
            <p><strong>Paciente NSS:</strong> {{ cita.pacienteNSS }}</p>
            <p><strong>Motivo cita: </strong>{{ cita.motivoCita }}</p>
            <p><strong>Medico: </strong>{{ cita.medicoNumColegiado }}</p>
            <p><strong>Atributo: </strong>{{ cita.attribute11 }}</p>
            <a href="#" @click="eliminarCita(cita.id)">Eliminar</a>
        </li>
    </ul>
</template>

<script lang="ts">
import CitasListService from '@/services/CitasService';
import { defineComponent, onMounted, ref } from 'vue';
import { Cita } from '@/interfaces/Cita';

export default defineComponent({
    name: 'ListCitas',
    setup() {
        const service = new CitasListService();
        const citas = ref<Cita[]>([]);


        onMounted(async () => {
            const fetchedCitas = await service.fetchCitas();
            citas.value = fetchedCitas;
        });

        function formatDate(date: Date | string): string {
            return new Intl.DateTimeFormat('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).format(new Date(date));
        }
        const eliminarCita = async (id:number) => {
            try{
                await service.deleteCitas(id);
                const fetchedCitas = await service.fetchCitas();
                citas.value = fetchedCitas;
                
            } catch (error) {
                console.error("fallo al borrar la cita", error);
            }
        }

        return { citas, formatDate, eliminarCita };
    }
});

</script>

<style>
.citas-list {
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
    a{
        justify-self: flex-end;
        color: red;
        font-weight: bold;
        text-decoration: none;
    }
}
</style>