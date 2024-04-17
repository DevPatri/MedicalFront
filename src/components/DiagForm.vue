<template>
    <div>
        <h4>Diagnóstico</h4>
        <form>
            <label for="diagnostico">Diagnóstico</label>
            <textarea id="diagnostico" name="diagnostico" :placeholder="diagnostico?.valoracionEspecialista"></textarea>
            <button>Guardar</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Diagnostico } from '@/interfaces/Diagnostico';
    export default defineComponent({
        name: 'DiagForm',
        props: {
            diagnostico: Object as () => Diagnostico,
        },
        setup(props) {
            
            return {props};
        },
    });
</script>

<style scoped>

</style>