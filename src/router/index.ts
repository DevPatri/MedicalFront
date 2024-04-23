import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MedicosView from '@/views/MedicosView.vue'

import CrearPaciente from '@/views/pacientesview/CreatePacienteView.vue'
import PacientesView from '@/views/pacientesview/PacientesView.vue'

import CitasView from '@/views/citasviews/CitasView.vue'
import CrearCita from '@/views/citasviews/CreateCitaView.vue'
import CitaDetailView from '@/views/citasviews/CitaDetailView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/citas',
    name: 'citas',
    component: CitasView
  },
  {
    path: '/citas/:id',
    name: 'cita',
    component: CitaDetailView
  },
  {
    path: '/crear-cita',
    name: 'crear-cita',
    component: CrearCita
  },
  {
    path: '/medicos',
    name: 'medicos',
    component: MedicosView
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PacientesView
  },
  {
    path: '/crear-paciente',
    name: 'crear-paciente',
    component: CrearPaciente
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
