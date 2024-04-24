<template>
    <div>
        <h2>Crear m&eacute;dico</h2>
        <form>
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" v-model="medico.nombre" id="nombre" required>
            </div>
            <div>
                <label for="apellidos">Apellidos:</label>
                <input type="text" v-model="medico.apellidos" id="apellidos" required>
            </div>
            <div>
                <label for="numColegiado">Número de colegiado:</label>
                <input type="text" v-model="medico.numColegiado" id="numColegiado" required>
            </div>
            <div>
                <label for="usuario">Usuario:</label>
                <input type="text" v-model="medico.usuario" id="usuario" required>
            </div>
            <div>
                <label for="clave">Clave:</label>
                <input type="password" v-model="medico.clave" id="clave" required>
            </div>
            <a @click="crearMedico">Crear m&eacute;dico</a>
</form>
    </div>
</template>

<script lang="ts">
import { Medico } from '@/interfaces/Medico';
import { Ref, defineComponent, ref } from 'vue';
import MedicosListService from '@/services/MedicosService';
import router from '@/router';
export default defineComponent({
    name: 'CrearMedico',
    setup() {
        const medicoService = new MedicosListService()
        const medico: Ref<Medico> = ref({
            nombre: '',
            apellidos: '',
            numColegiado: '',
            telefono: '',
            direccion: '',
            usuario: '',
            clave: ''
        })
        
        const crearMedico = async () => {
            try {
                await medicoService.createMedico(medico.value)
                router.push('/medicos')
            } catch (error) {
                console.error("fallo al crear el medico", error)
            }
        }
        return {
            medico,
            crearMedico
        }
    }
})
</script>

<style src="./CreateMedicoView.css" scoped/>
