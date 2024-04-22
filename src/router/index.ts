import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CitasView from '@/views/CitasView.vue'
import MedicosView from '@/views/MedicosView.vue'
import PacientesView from '@/views/PacientesView.vue'
import CrearCita from '@/views/CreateCitaView.vue'
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
    path: '/crear-cita',
    name: 'crear-cita',
    component: CrearCita
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
