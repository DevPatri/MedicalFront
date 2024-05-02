import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/loginview/LoginView.vue'

import MedicosView from '@/views/medicosviews/MedicosView.vue'
import CrearMedico from '@/views/medicosviews/crearmedicoview/CreateMedicoView.vue'
import MedicoDetailview from '@/views/medicosviews/medicodetail/MedicoDetailview.vue'

import CrearPaciente from '@/views/pacientesview/crearpacienteview/CreatePacienteView.vue'
import PacientesView from '@/views/pacientesview/PacientesView.vue'
import PacienteDetailView from '@/views/pacientesview/pacientesdetailview/PacienteDetailView.vue'

import CitasView from '@/views/citasviews/CitasView.vue'
import CrearCita from '@/views/citasviews/createcitaview/CreateCitaView.vue'
import CitaDetailView from '@/views/citasviews/citadetailview/CitaDetailView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
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
    path: '/medicos/:numColegiado',
    name: 'medico',
    component: MedicoDetailview
  },
  {
    path: '/crear-medico',
    name: 'crear-medico',
    component: CrearMedico
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PacientesView
  },
  {
    path: '/pacientes/:nss',
    name: 'paciente',
    component: PacienteDetailView
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
