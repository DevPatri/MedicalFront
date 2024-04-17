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
    const url = `http://localhost:8080/paciente/${nss}`;
    const response = await axios.get<Paciente>(url);
    return response.data;
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
