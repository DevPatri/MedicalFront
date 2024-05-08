import axios from "axios";
import { Ref, ref } from "vue";
import { useAuthStore } from "./AuthStore";

class AuthService {
  private token: Ref<string>;
  private error: Ref<string>;

  constructor() {
    this.token = ref("");
    this.error = ref("");
  }

  getJwt(): Ref<string> {
    return this.token;
  }

  getError(): Ref<string> {
    return this.error;
  }
  //* Método para loguear un médico y poder acceder con el token
  async login(usuario: string, clave: string): Promise<boolean> {
    try {
      const authStore = useAuthStore();
      const URL_LOGIN = "http://localhost:8080/auth/login";

      const response = await axios.post(
        URL_LOGIN,
        {
          usuario: usuario,
          clave: clave,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.token) {
        this.token.value = response.data.token;
        authStore.setToken(response.data.token);

        setTimeout(() => {
          //* a los 15 minutos se cierra la sesión igual que en la API
          this.token.value = "";
          authStore.setToken("");
        }, 900000);

        return true;
      } else {
        this.error.value = "Login failed";
        return false;
      }
    } catch (error) {
      this.error.value = "Login failed" + error;
      return false;
    }
  }

  async register(
    //* Método para registrar un médico y poder acceder con el token
    nombre: string,
    apellidos: string,
    usuario: string,
    clave: string,
    numColegiado: string
  ): Promise<boolean> {
    try {
      const authStore = useAuthStore();
      const URL_REGISTER = "http://localhost:8080/auth/register";

      const response = await axios.post(
        URL_REGISTER,
        {
          nombre: nombre,
          apellidos: apellidos,
          usuario: usuario,
          clave: clave,
          numColegiado: numColegiado,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.token) {
        this.token.value = response.data.token;
        authStore.setToken(response.data.token);
        return true;
      } else {
        this.error.value = "Register failed";
        return false;
      }
    } catch (error) {
      this.error.value = "Register failed" + error;
      return false;
    }
  }
}

export default AuthService;
