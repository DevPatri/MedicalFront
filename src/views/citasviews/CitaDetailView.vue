<template>
    <div class="list">
        <h1>Cita</h1>
        <ul>
            <li>
                <h3>{{ formatDate(cita.fechaHora) }}</h3>
                <p><strong>Paciente NSS:</strong> {{ cita.pacienteNSS }}</p>
                <p><strong>Motivo cita: </strong>{{ cita.motivoCita }}</p>
                <p><strong>M&eacute;dico: </strong>{{ cita.medicoNumColegiado }}</p>
                <p><strong>Atributo: </strong>{{ cita.attribute11 }}</p>
                <hr>
                <p><strong>Diagn&oacute;stico: </strong></p>
                <div class="diagn">
                    <div>
                        <p>Enfermedad: </p>
                        <textarea class="textdiagn" v-model="cita.diagnostico.enfermedad">
                        </textarea>
                    </div>
                    <div>
                        <p>Valoraci&oacute;n: </p>
                        <textarea class="textdiagn" v-model="cita.diagnostico.valoracionEspecialista">
                        </textarea>
                    </div>
                </div>
            </li>
        </ul>
        <a class="bt-primary" @click="updateCita">Actualizar</a>
        <router-link class="bt-volver" :to="{ name: 'citas' }">Volver</router-link>
    </div>
</template>

<script lang="ts" setup>

import { Ref, onMounted, ref } from 'vue';
import { Cita } from '@/interfaces/Cita';
import CitasListService from '@/services/CitasService';
import { useRoute } from 'vue-router';
import router from '@/router';

const service = new CitasListService();
const cita: Ref<Cita> = ref({
      id: 0,
      fechaHora: new Date(),
      motivoCita: "",
      diagnostico: {
        id: 0,
        enfermedad: "",
        valoracionEspecialista: "",
      },
      medicoNumColegiado: "", 
      pacienteNSS: "",
      attribute11: 0,
    } as Cita);

onMounted(async () => {
    const route = useRoute();
    if (route.params && route.params.id) {
        const id = Number(route.params.id);
        const fetchedCita = await service.fetchCita(id)
        cita.value = { ...fetchedCita, diagnostico: fetchedCita.diagnostico || cita.value.diagnostico };
    }
})

const updateCita = async () => {
    await service.updateCita(cita.value);
    router.push({ name: 'citas' });
}
function formatDate(date: Date | string): string {
            return new Intl.DateTimeFormat('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).format(new Date(date));
        }
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
li hr{
    width: 100%;
}

a {
    text-decoration: none;
}

.diagn {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 0 auto;

    >div {
        display: flex;
        flex-direction: column;
        padding: 0 20px;

        .textdiagn {
            width: 100%;
            min-height: 15vh;
            padding: 5px;
        }
    }
}

.bt-primary {
    cursor: pointer;
    background-color: rgb(40, 154, 68);
    padding: 4px 12px;
    border-radius: 5px;
    margin-right: 30px;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgb(255, 255, 255);
}
.bt-primary:hover {
    color: rgb(176, 196, 182);
}
.bt-primary:active {
    color: rgb(63, 122, 77);
}

.bt-volver {
    background-color: rgb(58, 58, 175);
    padding: 4px 12px;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgb(255, 255, 255);
}

.bt-volver:hover {
    color: rgb(187, 187, 248);
}

.bt-volver:active {
    color: rgb(32, 32, 97);
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>