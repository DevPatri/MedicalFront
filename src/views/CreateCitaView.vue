<template>
    <div>
        <h2>Crear cita</h2>
        <form>
            <label for="paciente">Paciente:</label>
            <select v-model="paciente" id="paciente">
                <option v-for="paciente in pacientes" :key="paciente.nss" :value="paciente.nss">{{
                    paciente.nombre + ' ' + paciente.nss }}
                </option>
            </select>
            <label for="medico">Médico:</label>
            <select v-model="medico" id="medico">
                <option v-for="medico in medicos" :key="medico.numColegiado" :value="medico.numColegiado">{{
                    medico.nombre + ' ' + medico.numColegiado }}</option>
            </select>
            <label for="fecha">Fecha:</label>
            <input v-model="fecha" type="datetime-local" id="fecha" name="fecha" required>
            <label for="motivo">Motivo cita:</label>
            <textarea v-model="motivo" type="text" id="motivo" name="motivo" required></textarea>
            <button type="submit" @click="crearCita">Crear cita</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Ref, defineComponent, onBeforeMount, ref } from 'vue';
import PacientesListService from '@/services/PacientesService';
import MedicosListService from '@/services/MedicosService';
import { Paciente } from '@/interfaces/Paciente';
import { Medico } from '@/interfaces/Medico';
import CitasListService from '@/services/CitasService';
import { Cita } from '@/interfaces/Cita';

export default defineComponent({
    name: 'CrearCita',
    setup() {
        const citaService = new CitasListService()
        const service = new PacientesListService()
        const pacientes = ref<Paciente[]>([])
        const medicoService = new MedicosListService()
        const medicos = ref<Medico[]>([])

        onBeforeMount(async () => {
            const fetchPacientes = await service.fetchPacientes()
            pacientes.value = fetchPacientes

            const fetchMedicos = await medicoService.fetchMedicos()
            medicos.value = fetchMedicos
        })

        let medico: Ref<string> = ref('')
        let fecha: Ref<string> = ref('')
        let paciente: Ref<string> = ref('')
        let motivo: Ref<string> = ref('')

        const crearCita = async () => {
            try {
                const cita: Cita =
                {
                    pacienteNSS: paciente.value,
                    medicoNumColegiado: medico.value,
                    fechaHora: new Date(fecha.value),
                    motivoCita: motivo.value,
                    id: 0,
                    attribute11: 0,
                    diagnostico: {
                        id: 0,
                        enfermedad: '',
                        valoracionEspecialista: ''
                    }
                }
                console.log(cita)
                await citaService.createCita(cita)
            }catch (error) {
                console.error("fallo al crear la cita", error)
            }
        }

        return {
            pacientes,
            medicos,
            crearCita,
            fecha,
            medico,
            paciente,
            motivo
        }
    }
})

</script>

<style scoped>
div {
    margin-top: 100px;
}

form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    width: 300px;
    margin: 0 auto;

    label {
        padding-right: 15px;
        justify-self: end;
    }

    button {
        grid-column: span 2;
    }

    textarea {
        resize: none;
        min-height: 50px;
        max-height: 200px;
        width: 150px;
        box-sizing: content;
    }
}
</style>