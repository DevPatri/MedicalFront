<template>
    <div>

        <h1>Paciente</h1>
        <ul>
            <li>
                <p><strong>Nombre: </strong>{{ paciente.nombre }}</p>
                <p><strong>Apellidos: </strong>{{ paciente.apellidos }}</p>
                <p><strong>NSS: </strong>{{ paciente.nss }}</p>
                <p><strong>Direcci&oacute;n: </strong>{{ paciente.direccion }}</p>
                <p><strong>Tel&eacute;fono: </strong>{{ paciente.telefono }}</p>
            </li>
        </ul>
        <router-link class="bt-volver" :to="{ name: 'pacientes' }">Volver</router-link>
    </div>
</template>

<script lang="ts">
import { Paciente } from '@/interfaces/Paciente'
import PacientesListService from '@/services/PacientesService'
import { Ref, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'PacienteDetailView',
    setup() {
        const service = new PacientesListService()
        const paciente: Ref<Paciente> = ref({
            nombre: '',
            apellidos: '',
            nss: '',
            direccion: '',
            telefono: ''
        } as Paciente)

        onMounted(async () => {
            const route = useRoute()
            if (route.params && route.params.nss) {
                if(Array.isArray(route.params.nss)){
                    route.params.nss = route.params.nss[0]
                }
                let nss:string = route.params.nss
                const fetchedPaciente = await service.getPaciente(nss)
                if (fetchedPaciente) {
                    paciente.value = fetchedPaciente
                }
            }
        })
        return {
            paciente
        }
    }
})
</script>
<style src="./PacienteDetailView.css" scoped/>