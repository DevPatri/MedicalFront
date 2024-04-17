import { ref } from "vue";
import axios from "axios";
import { Cita } from "@/interfaces/Cita";

class CitasListService {
  private citas = ref<Cita[]>([]);

  getCitas() {
    return this.citas.value;
  }

  async fetchCitas() {
    try {
      const url = "http://localhost:8080/cita";
      const response = await axios.get<Cita[]>(url);
      this.citas.value = response.data;
      console.log(response.data);
      return this.citas.value;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createCita(cita: Cita) {
    const url = "http://localhost:8080/cita";
    await axios.post(url, cita).then(() => {
      this.citas.value.push(cita);
    });
  }

  async deleteCitas(id: number) {
    const url = `http://localhost:8080/cita/${id}`;
    await axios.delete(url)
    .then(() => {
      this.citas.value = this.citas.value.filter(cita => cita.id !== id);
    });
  }
}
export default CitasListService;
