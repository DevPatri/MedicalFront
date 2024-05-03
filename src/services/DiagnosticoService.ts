import { Diagnostico } from "@/interfaces/Diagnostico";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "@/Auth/AuthStore";

class DiagnosticoService {
    private diagnosticos = ref<Diagnostico[]>([]);
    private URL_DIAGNOSTICO = "http://localhost:8080/diagnostico";

    getDiagnosticos() {
        return this.diagnosticos.value;
    }

    async fetchDiagnosticos(): Promise<Diagnostico[]> 
    {
        try {
            const response = await axios.get<Diagnostico[]>(this.URL_DIAGNOSTICO, {
                headers: {
                  "Authorization": `Bearer ${useAuthStore().token}`
                }
              });
            this.diagnosticos.value = response.data;
            return this.diagnosticos.value;
        } catch (error) {
            return [];
        }
    }

    async addDiagnostico(enfermedad: string, valoracionEspecialista: string): Promise<void>
    {
        await axios.post(this.URL_DIAGNOSTICO, {
            enfermedad: enfermedad,
            valoracionEspecialista: valoracionEspecialista,
            headers: {
                "Authorization": `Bearer ${useAuthStore().token}`
              }
        },
    );
    }

    async deleteDiagnosticos(id: number): Promise<void> 
    {
        const url = this.URL_DIAGNOSTICO + id;
        await axios.delete(url).then(() => {
            this.diagnosticos.value = this.diagnosticos.value.filter(
                (diagnostico) => diagnostico.id !== id
            );
        });
    }

    async updateDiagnostico(
        id: number,
        enfermedad: string,
        valoracionEspecialista: string
    ): Promise<void>
    {
        const url = this.URL_DIAGNOSTICO + id;
        await axios
            .put(url, {
                enfermedad: enfermedad,
                valoracionEspecialista: valoracionEspecialista,
                diagnosticoId: id,
                headers: {
                    "Authorization": `Bearer ${useAuthStore().token }`
                  }
            })
            .then(() => {
                this.diagnosticos.value = this.diagnosticos.value.filter(
                    (diagnostico) => diagnostico.id !== id
                );
            });
    }
}
export default DiagnosticoService;