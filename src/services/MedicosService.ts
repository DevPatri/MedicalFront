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
      const response = await axios.get<Medico[]>(this.URL_MEDICOS, {
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
      const response = await axios
      .get<Medico>(this.URL_MEDICOS + '/' + numColegiado, {
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
    await axios.delete(this.URL_MEDICOS + '/' + numColegiado)
    .then(() => {
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
    await axios
      .put(this.URL_MEDICOS + '/' + numColegiado, {
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
