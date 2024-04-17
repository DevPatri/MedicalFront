<template>
    <ul class="list" v-if="citas">
        <li v-for="cita in citas" v-bind:key="cita.id">
            <h3>{{ formatDate(cita.fechaHora) }}</h3>
            <p><strong>Paciente NSS:</strong> {{ cita.pacienteNSS }}</p>
            <p><strong>Motivo cita: </strong>{{ cita.motivoCita }}</p>
            <p><strong>M&eacute;dico: </strong>{{ cita.medicoNumColegiado }}</p>
            <p><strong>Atributo: </strong>{{ cita.attribute11 }}</p>
            <p><strong>Diagn&oacute;stico: </strong>{{ cita.diagnostico }}</p>
            <!-- <a class="bt-diag" href="#"  @click="enviarDiag(cita.diagnostico)">Diagn&oacute;stico</a> -->
            <a class="bt-elim" href="#" @click="eliminarCita(cita.id)">Eliminar</a>
            <!-- <DiagForm :diagnostico="cita.diagnostico"/> -->
        </li>
    </ul>
</template>

<script lang="ts">
// import DiagForm from '@/components/DiagForm.vue';
import CitasListService from '@/services/CitasService';
import { onBeforeMount, ref } from 'vue';
import { Cita } from '@/interfaces/Cita';
// import { Diagnostico } from '@/interfaces/Diagnostico';

export default {
    name: 'ListCitas',
    // components: {
    //     DiagForm,
    // },
    setup() {
        const service = new CitasListService();
        const citas = ref<Cita[]>([]);


        onBeforeMount(async () => {
            //llamamos al servicio para obtener las citas antes de que se monte el componente
            const fetchedCitas = await service.fetchCitas();
            citas.value = fetchedCitas;
        });

        // Formatear la fecha
        function formatDate(date: Date | string): string {
            return new Intl.DateTimeFormat('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).format(new Date(date));
        }
        // función que llama al servicio para eliminar una cita
        const eliminarCita = async (id: number) => {
            try {
                await service.deleteCitas(id);
                const fetchedCitas = await service.fetchCitas();
                citas.value = fetchedCitas.sort((a, b) => a.fechaHora > b.fechaHora ? 1 : -1);

            } catch (error) {
                console.error("fallo al borrar la cita", error);
            }
        }
        // const enviarDiag = (diag:Diagnostico) => {
        //     emit('diagnostico', diag);
        // }

        return { 
            citas, 
            formatDate,
            eliminarCita
        };
    }
};

</script>

<style scoped>
.list {
    display: grid;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0 auto;
    width: 70vw;

    li {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-content: start;
        align-items: center;
        padding: 15px;
        background-color: #bce2d1;
        border-radius: 5px;
        border: 1px solid white;
        filter: blur(0.5px);
        box-shadow: 0 0 10px rgba(0,0,0,0.2);

        h3,
        p {
            margin: 0;
            padding: 0 1rem;
        }
    }

    .bt-elim {
        justify-self: flex-end;
        grid-column: span 2;
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