import { Diagnostico } from "@/interfaces/Diagnostico";
import axios from "axios";
import { ref } from "vue";

class DiagnosticoService {
    private diagnosticos = ref<Diagnostico[]>([]);

    getDiagnosticos() {
        return this.diagnosticos.value;
    }

    async fetchDiagnosticos() {
        try {
            const url = "http://localhost:8080/diagnostico";
            const response = await axios.get<Diagnostico[]>(url);
            this.diagnosticos.value = response.data;
            return this.diagnosticos.value;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async addDiagnostico(enfermedad: string, valoracionEspecialista: string) {
        const url = "http://localhost:8080/diagnostico";
        await axios.post(url, {
            enfermedad: enfermedad,
            valoracionEspecialista: valoracionEspecialista,
        });
    }

    async deleteDiagnosticos(id: number) {
        const url = `http://localhost:8080/diagnostico/${id}`;
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
    ) {
        const url = `http://localhost:8080/diagnostico/${id}`;
        await axios
            .put(url, {
                enfermedad: enfermedad,
                valoracionEspecialista: valoracionEspecialista,
                diagnosticoId: id,
            })
            .then(() => {
                this.diagnosticos.value = this.diagnosticos.value.filter(
                    (diagnostico) => diagnostico.id !== id
                );
            });
    }
}
export default DiagnosticoService;