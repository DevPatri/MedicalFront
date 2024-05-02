import { Medico } from "@/interfaces/Medico";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "@/Auth/AuthStore";

class MedicosService {
  private medicos = ref<Medico[]>([]);

  getMedicos() {
    return this.medicos.value;
  }

  async fetchMedicos() {
    try {
      const url = "http://localhost:8080/medico";
      const response = await axios.get<Medico[]>(url, {
        headers: {
          "Authorization": `Bearer ${useAuthStore().token}`
        }
      });
      this.medicos.value = response.data;
      return this.medicos.value;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async fetchMedico(numColegiado: string) {
    try {
      const url = `http://localhost:8080/medico/${numColegiado}`;
      const response = await axios.get<Medico>(url, {
        headers: {
          "Authorization": `Bearer ${useAuthStore().token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createMedico(medico: Medico) {
    const url = "http://localhost:8080/medico";
    await axios.post(url, medico).then(() => {
      this.medicos.value.push(medico);
    });
  }

  async deleteMedicos(numColegiado: string) {
    const url = `http://localhost:8080/medico/${numColegiado}`;
    await axios.delete(url).then(() => {
      this.medicos.value = this.medicos.value.filter(
        (medico) => medico.numColegiado !== numColegiado
      );
    });
  }

  async updateMedico(
    numColegiado: string,
    nombre: string,
    apellidos: string
  ) {
    const url = `http://localhost:8080/medico/${numColegiado}`;
    await axios
      .put(url, {
        nombre: nombre,
        apellidos: apellidos,
        medicoNumColegiado: numColegiado,
      })
      .then(() => {
        this.medicos.value = this.medicos.value.filter(
          (medico) => medico.numColegiado !== numColegiado
        );
      });
  }
}
export default MedicosService;
