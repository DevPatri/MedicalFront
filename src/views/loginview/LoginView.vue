<template>
    <div class="login">
        <h1>Login</h1>
        <form>
            <input v-model="name" type="text" name="username" placeholder="Username">
            <input v-model="password" type="password" name="password" placeholder="Password">
            <button type="submit" value="Login" @click.prevent="authUser">Login</button>
            <router-link to="register">Registro</router-link>
        </form>
    </div>
</template>

<script lang="ts">
import { Ref, defineComponent, ref } from 'vue'
import AuthService from '@/Auth/AuthService'
import router from '@/router'

export default defineComponent({
    name: 'LoginView',
    setup() {
        let name: Ref<string> = ref('')
        let password: Ref<string> = ref('')

        const authUser = async () => {
            const auth = new AuthService()
            if(!name.value || !password.value) {
                alert('Debe rellenar todos los campos')
                return
            }
            const response = await auth.login(name.value, password.value)
            if (response) {
                
                console.log(response)
                router.push('citas')
            } else {
                alert('Login failed')
            }
        }
        return {
            name,
            password,
            authUser
        };
    }
});
</script>

<style src="./LoginView.css" scoped />