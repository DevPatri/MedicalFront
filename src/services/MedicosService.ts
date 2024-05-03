import { Medico } from "@/interfaces/Medico";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "@/Auth/AuthStore";

class MedicosService {
  private medicos = ref<Medico[]>([]);
  private URL_MEDICOS = "http://localhost:8080/medico";
  getMedicos() {
    return this.medicos.value;
  }

  async fetchMedicos(): Promise<Medico[]> {
    try {
      const url = this.URL_MEDICOS;
      const response = await axios.get<Medico[]>(url, {
        headers: {
          "Authorization": `Bearer ${useAuthStore().token}`
        }
      });
      this.medicos.value = response.data;
      return this.medicos.value;
    } catch (error) {
      return [];
    }
  }

  async fetchMedico(numColegiado: string): Promise<Medico | null> {
    try {
      const url = this.URL_MEDICOS + numColegiado;
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

  async createMedico(medico: Medico): Promise<void> {

    await axios.post(this.URL_MEDICOS, medico).then(() => {
      this.medicos.value.push(medico);
    });
  }

  async deleteMedicos(numColegiado: string) {
    const url = this.URL_MEDICOS + numColegiado;
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
  ): Promise<void> {
    const url = this.URL_MEDICOS + numColegiado;
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
