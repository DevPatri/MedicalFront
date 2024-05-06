import { ref } from "vue";
import axios from "axios";
import { Paciente } from "@/interfaces/Paciente";
import { useAuthStore } from "@/Auth/AuthStore";

class PacientesListService {
  private pacientes = ref<Paciente[]>([]);
  private URL_PACIENTES = "http://localhost:8080/paciente";
  
  getPacientes() {
    return this.pacientes.value;
  }

  async fetchPacientes(): Promise<Paciente[]> {
    try {
      const url = this.URL_PACIENTES;
      const response = await axios.get<Paciente[]>(url, {
        headers: {
          "Authorization": `Bearer ${useAuthStore().token}`
        }
      });
      this.pacientes.value = response.data;
      return this.pacientes.value;
    } catch (error) {
      return [];
    }
  }

  async getPaciente(nss: string): Promise<Paciente | null> {
    try {
      const url = this.URL_PACIENTES + '/' + nss;
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${useAuthStore().token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("No se ha podido obtener al paciente", error);
      return null;
    }
  }

  async createPaciente(paciente: Paciente): Promise<void> {
  
    await axios
      .post(this.URL_PACIENTES, paciente)
      .then(() => {
        this.pacientes.value.push(paciente);
      })
      .catch((error) => {
        console.error("No se ha podido crear al paciente", error);
      });
  }

  async deletePacientes(nss: string): Promise<void> {
    
    await axios.delete(this.URL_PACIENTES+ '/' + nss)
    .then(() => {
      this.pacientes.value = this.pacientes.value.filter(
        (paciente) => paciente.nss !== nss
      );
    });
  }

  async updatePaciente(
    nss: string,
    nombre: string,
    apellidos: string,
    direccion: string,
    telefono: string
  ): Promise<void> {
    await axios
      .put(this.URL_PACIENTES+ '/' + nss, {
        nombre: nombre,
        apellidos: apellidos,
        nss: nss,
        direccion: direccion,
        telefono: telefono,
      })
      .then(() => {
        this.pacientes.value = this.pacientes.value.filter(
          (paciente) => paciente.nss !== nss
        );
      });
  }
}
export default PacientesListService;
