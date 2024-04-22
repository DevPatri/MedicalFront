import { Ref, ref, defineComponent } from 'vue';
export default defineComponent({
    setup(props) {

        const id = props
        const enfermedad: Ref<string> = ref('')
        const valoracion: Ref<string> = ref('')

        return {
            enfermedad,
            valoracion,
            id
        }
    }
})