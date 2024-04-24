import { ref } from "vue";
import axios from "axios";
import { Paciente } from "@/interfaces/Paciente";

class PacientesListService {
  private pacientes = ref<Paciente[]>([]);

  getPacientes() {
    return this.pacientes.value;
  }

  async fetchPacientes() {
    try {
      const url = "http://localhost:8080/paciente";
      const response = await axios.get<Paciente[]>(url);
      this.pacientes.value = response.data;
      return this.pacientes.value;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getPaciente(nss: string) {
    try{
      const url = `http://localhost:8080/paciente/${nss}`;
      const response = await axios.get(url);
      console.log(nss)
      console.log(response);
      return response.data;
    }catch(error){
      console.error('No se ha podido obtener al paciente', error);
      return null;
    }
  }

  async createPaciente(paciente: Paciente) {
    const url = "http://localhost:8080/paciente";
    try{
      await axios.post(url, paciente)
      .then(() => { this.pacientes.value.push(paciente) })
    }catch(error){
      console.error('No se ha podido crear al paciente', error);
    }
  }

  async deletePacientes(nss: string) {
    const url = `http://localhost:8080/paciente/${nss}`;
    await axios.delete(url).then(() => {
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
  ) {
    const url = `http://localhost:8080/paciente/${nss}`;
    await axios
      .put(url, {
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
