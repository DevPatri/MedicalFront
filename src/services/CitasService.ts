import { Ref, ref } from "vue";
import axios from "axios";
import { Cita } from "@/interfaces/Cita";
import { useAuthStore } from "@/Auth/AuthStore";

class CitasListService {
  private citas: Ref<Cita[]> = ref<Cita[]>([]);
  private cita: Ref<Cita>;

  constructor() {
    this.citas = ref<Cita[]>([]);
    this.cita = ref<Cita>({
      id: 0,
      fechaHora: new Date(),
      motivoCita: "",
      diagnostico: {
        id: 0,
        enfermedad: "",
        valoracionEspecialista: "",
      },
      medicoNumColegiado: "",
      pacienteNSS: "",
      attribute11: 0,
    });
  }

  getCitas(): Cita[] {
    return this.citas.value;
  }

  getCita(): Ref<Cita> {
    return this.cita;
  }

  async fetchCitas(): Promise<Cita[]> {
    try {
      const url = "http://localhost:8080/cita";
      const response = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${useAuthStore().token}`
        }
      });
      this.citas.value = response.data;
      return this.citas.value;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async fetchCita(id: number): Promise<Cita> {
    try {
      const url = `http://localhost:8080/cita/${id}`;
      const response = await axios.get(url, { 
        headers: {
          "Authorization": `Bearer ${useAuthStore().token}`
        },
        });
      this.cita.value = await response.data;
      return this.cita.value;
    } catch (error) {
      console.log(error);
      return {} as Cita;
    }
  }

  async createCita(cita: Cita): Promise<void> {
    const url = "http://localhost:8080/cita";
    await axios
      .post(url, cita)
      .then(() => {
        this.citas.value.push(cita);
      })
      .catch((error) => {
        console.error('Error al insertar la cita.', error);
      });
  }

  async deleteCitas(id: number): Promise<void> {
    const url = `http://localhost:8080/cita/${id}`;
    await axios.delete(url).then(() => {
      this.citas.value = this.citas.value.filter((cita) => cita.id !== id);
    });
  }

  async updateCita(cita: Cita): Promise<void> {
    const url = `http://localhost:8080/cita/${cita.id}`;
    await axios.put(url, cita).then(() => {
      this.citas.value = this.citas.value.map((c) => {
        if (c.id === cita.id) {
          return cita;
        }
        return c;
      });
    });
  }
}
export default CitasListService;
