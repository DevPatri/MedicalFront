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

<style src="./CitaDetailView.css" scoped />