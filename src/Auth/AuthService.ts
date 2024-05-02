import axios from "axios";
import {Ref, ref } from "vue";
import { useAuthStore } from "./AuthStore";

class AuthService {

    private token: Ref<string>
    private error: Ref<string>

    constructor() {
        this.token = ref('')
        this.error = ref('')
    }

    getJwt(): Ref<string> {
        return this.token
    }

    getError(): Ref<string> {
        return this.error
    }

    async login(usuario:string, clave:string): Promise<boolean> {

        try {
            const authStore = useAuthStore()            

            const response = await axios.post('http://localhost:8080/auth/login', {
                usuario: usuario,
                clave: clave
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if(response.data.token){
                this.token.value = response.data.token
                authStore.setToken(response.data.token)
                return true
            }else{
                this.error.value = "Login failed"
                return false
            }

        }catch(error) {
            this.error.value = "Login failed" + error
            return false
        }
    }
}

export default AuthService