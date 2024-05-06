import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/loginview/LoginView.vue";

import MedicosView from "@/views/medicosviews/MedicosView.vue";
import CrearMedico from "@/views/medicosviews/crearmedicoview/CreateMedicoView.vue";
import MedicoDetailview from "@/views/medicosviews/medicodetail/MedicoDetailview.vue";

import CrearPaciente from "@/views/pacientesview/crearpacienteview/CreatePacienteView.vue";
import PacientesView from "@/views/pacientesview/PacientesView.vue";
import PacienteDetailView from "@/views/pacientesview/pacientesdetailview/PacienteDetailView.vue";

import CitasView from "@/views/citasviews/CitasView.vue";
import CrearCita from "@/views/citasviews/createcitaview/CreateCitaView.vue";
import CitaDetailView from "@/views/citasviews/citadetailview/CitaDetailView.vue";
import RegisterView from "@/views/registerview/RegisterView.vue";
import { useAuthStore } from "@/Auth/AuthStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/citas",
    name: "citas",
    component: CitasView,
  },
  {
    path: "/citas/:id",
    name: "cita",
    component: CitaDetailView,
  },
  {
    path: "/crear-cita",
    name: "crear-cita",
    component: CrearCita,
  },
  {
    path: "/medicos",
    name: "medicos",
    component: MedicosView,
  },
  {
    path: "/medicos/:numColegiado",
    name: "medico",
    component: MedicoDetailview,
  },
  {
    path: "/crear-medico",
    name: "crear-medico",
    component: CrearMedico,
  },
  {
    path: "/pacientes",
    name: "pacientes",
    component: PacientesView,
  },
  {
    path: "/pacientes/:nss",
    name: "paciente",
    component: PacienteDetailView,
  },
  {
    path: "/crear-paciente",
    name: "crear-paciente",
    component: CrearPaciente,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = useAuthStore().token !== "";

  if (to.name !== "login" && to.name !== "register" && to.name !== "home" && !isAuth) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
