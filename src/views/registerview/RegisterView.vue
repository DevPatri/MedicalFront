<template>
    <div class="register">
        <h1>Registro</h1>
        <form>
            <input v-model="nombre" type="text" name="nombre" placeholder="Nombre">
            <input v-model="apellidos" type="text" name="apellidos" placeholder="Apellidos">
            <input v-model="usuario" type="text" name="usuario" placeholder="Usuario">
            <input v-model="clave" type="password" name="clave" placeholder="Clave">
            <input v-model="numColegiado" type="text" name="numColegiado" placeholder="Número de colegiado">
            <button type="submit" value="Register" @click.prevent="register">Registrar</button>
            <router-link to="login">Login</router-link>
        </form>
    </div>
</template>

<script lang="ts">

import { Ref, defineComponent, ref } from 'vue';
import AuthService from '@/Auth/AuthService';
import router from '@/router';

export default defineComponent({
    name: 'RegisterView',
    setup() {
        let nombre: Ref<string> = ref('');
        let apellidos: Ref<string> = ref('');
        let usuario: Ref<string> = ref('');
        let clave: Ref<string> = ref('');
        let numColegiado: Ref<string> = ref('');
        
        // -> Función para registrar un usuario
        const register = async () => {
            const auth = new AuthService();
            if (!nombre.value   // -> Comprobamos que los campos no estén vacíos
                || !apellidos.value
                || !usuario.value
                || !clave.value
                || !numColegiado.value) {
                alert('Debe rellenar todos los campos');
                return;
            }
            const response = await auth.register(
                nombre.value,
                apellidos.value,
                usuario.value,
                clave.value,
                numColegiado.value
            );
            if (response) {
                router.push('citas');
            } else {
                alert('Register failed' + response);
            }
        }
        return {
            nombre,
            apellidos,
            usuario,
            clave,
            numColegiado,
            register
        };
    },

});
</script>

<style src="./RegisterView.css" scoped />
