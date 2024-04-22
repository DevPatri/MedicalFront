<template>
    <h1>Diagn&oacute;stico</h1>
    <form>
        <input v-model="enfermedad" type="text" name="enfermedad" id="enfermedad">
        <input v-model="valoracion" type="text" name="valoracion" id="valoracion">
        <button>Actualizar</button>
    </form>

</template>
<script lang="ts" src="./diagnosticoTs.js" />
<style scoped src="./diagnosticoCss.css" />

