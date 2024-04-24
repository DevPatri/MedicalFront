<template>
    <ul class="list" v-if="citas">
        <li v-for="cita in citas" v-bind:key="cita.id">
            <h3>{{ formatDate(cita.fechaHora) }}</h3>
            <p><strong>Paciente NSS:</strong> {{ cita.pacienteNSS }}</p>
            <p><strong>Motivo cita: </strong>{{ cita.motivoCita }}</p>
            <div>
                <router-link class="bt-diag" :to="{ name: 'cita', params: { id: cita.id } }">Detalle</router-link>
                <a class="bt-elim" href="#" @click="eliminarCita(cita.id)">Eliminar</a>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
import CitasListService from '@/services/CitasService'
import { onBeforeMount, ref } from 'vue'
import { Cita } from '@/interfaces/Cita'

export default {
    name: 'ListCitas',

    setup() {
        const service = new CitasListService()
        const citas = ref<Cita[]>([]);
        
        //llamamos al servicio para obtener las citas antes de que se monte el componente
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
            }).format(new Date(date))
        }
        // función que llama al servicio para eliminar una cita
        const eliminarCita = async (id: number) => {
            try {
                await service.deleteCitas(id);
                const fetchedCitas = await service.fetchCitas()
                citas.value = fetchedCitas

            } catch (error) {
                console.error("fallo al borrar la cita", error)
            }
        }

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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        div{
            justify-self: flex-end;
            padding: 0 1rem;
        }

        h3,
        p {
            margin: 0;
            padding: 0 1rem;
        }
    }

    .bt-elim {
        color: red;
        font-weight: bold;
        text-decoration: none;
    }

    .bt-diag {
        padding-right: 1rem;
        color: rgb(58, 58, 175);
        font-weight: bold;
        text-decoration: none;
    }

    .bt-diag:hover {
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .bt-diag:active {
        color: rgb(32, 32, 97);
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
}
</style>