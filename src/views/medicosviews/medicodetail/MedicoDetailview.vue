<template>
    <div>
        <h2>M&eacute;dico</h2>
        <ul>
            <li>
                <p><strong>Nombre: </strong>{{ medico.nombre }}</p>
                <p><strong>Apellidos: </strong>{{ medico.apellidos }}</p>
                <p><strong>N&uacute;mero de colegiado: </strong>{{ medico.numColegiado }}</p>
                <p><strong>Usuario: </strong>{{ medico.usuario }}</p>
            </li>
        </ul>
        <router-link class="bt-volver" :to="{ name: 'medicos' }">Volver</router-link>
    </div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MedicosListService from '@/services/MedicosService'
import { Medico } from '@/interfaces/Medico'

export default defineComponent({
    name: 'MedicoDetailView',
    setup() {
        const service = new MedicosListService()
        const medico: Ref<Medico> = ref({
            nombre: '',
            apellidos: '',
            numColegiado: '',
            usuario: '',
            clave: ''
        } as Medico)

        onMounted(async () => {
            const route = useRoute()
            if (route.params && route.params.numColegiado) {
                if(Array.isArray(route.params.numColegiado)){
                    route.params.numColegiado = route.params.numColegiado[0]
                }
                let numColegiado: string = route.params.numColegiado
                const fetchedMedico = await service.fetchMedico(numColegiado)
                if (fetchedMedico) {
                    medico.value = fetchedMedico
                }
            }
        })
        return {
            medico
        }
    }
})
</script>

<style src="./MedicoDetailView.css" scoped/>