<template>
    <div class="list">
        <h1>Cita</h1>
        <ul>
            <li>
                <h3>{{ cita.fechaHora }}</h3>
                <p><strong>Paciente NSS:</strong> {{ cita.pacienteNSS }}</p>
                <p><strong>Motivo cita: </strong>{{ cita.motivoCita }}</p>
                <p><strong>M&eacute;dico: </strong>{{ cita.medicoNumColegiado }}</p>
                <p><strong>Atributo: </strong>{{ cita.attribute11 }}</p>
                <p><strong>Diagn&oacute;stico: </strong></p>
                <div class="diagn">
                    <div>
                        <p>Enfermedad: </p>
                        <textarea v-if="cita.diagnostico && cita.diagnostico.enfermedad"
                            v-model="cita.diagnostico.enfermedad">
                        </textarea>
                        <textarea v-else>&nbsp;</textarea>
                    </div>
                    <div>
                        <p>Valoraci&oacute;n: </p>
                        <textarea v-if="cita.diagnostico && cita.diagnostico.valoracionEspecialista"
                            v-model="cita.diagnostico.valoracionEspecialista">
                        </textarea>
                        <textarea v-else>&nbsp;</textarea>
                    </div>
                </div>
            </li>
        </ul>
        <router-link class="bt-volver" :to="{ name: 'citas' }">Volver</router-link>
    </div>
</template>

<script lang="ts" setup>

import { Ref, onMounted, ref } from 'vue';
import { Cita } from '@/interfaces/Cita';
import CitasListService from '@/services/CitasService';
import { useRoute } from 'vue-router';

const service = new CitasListService();
const cita: Ref<Cita> = ref('' as unknown as Cita);

onMounted(async () => {
    const route = useRoute();
    if (route.params && route.params.id) {
        let id = Number(route.params.id);
        cita.value = await service.fetchCita(id)
    }
})
</script>

<style scoped>
h1 {
    height: fit-content;
}

.list {
    width: 100%;
    padding: 0;
}

ul {
    padding: 0;
    height: fit-content;
    list-style-type: none;
}

a {
    text-decoration: none;
}

.diagn {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1rem;

    div {
        display: flex;
        flex-direction: column;
        padding: 0 20px;

        textarea {
            width: 100%;
            min-height: 10vh;
            padding: 5px;
        }
    }
}

.bt-volver {
    font-size: 1.2rem;
    font-weight: bold;
    color: rgb(58, 58, 175);
}

.bt-volver:hover {
    color: rgb(32, 32, 97);
}

.bt-volver:active {
    color: rgb(32, 32, 97);
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>