import {createRouter, createWebHistory} from 'vue-router'
import {session} from "@/stores/session";
import Dashboard from '@/views/app/dashboard/Index.vue';
import Units from '@/views/app/units/Index.vue';
import Unit from '@/views/app/units/Unit.vue';
import Patients from '@/views/app/patients/Index.vue';
import MedicalRecord from '@/views/app/medical_record/Index.vue';
import MyData from '@/views/app/my_data/Index.vue';
import ChangePassword from '@/views/app/my_data/ChangePassword.vue';
import Login from '@/views/auth/Login.vue';
import RecoverPassword from "@/views/auth/RecoverPassword.vue";
import Template from '@/views/app/Index.vue';


const DEFAULT_TITLE: string = 'Hospital Medical Care'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'dashboard',
      component: Template,
      children: [
        { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: {title: 'Dashboard'} },
        { path: '/unidades', name: 'units', component: Units, meta: {title: 'Unidades'} },
        { path: '/unidades/:id', name: 'unit', component: Unit, meta: {title: 'Unidade'} },
        { path: '/pacientes', name: 'patients', component: Patients, meta: {title: 'Pacientes'} },
        { path: '/unidade/prontuario/:id', name: 'medical-record-unit', component: MedicalRecord, meta: {title: 'Prontuário médico'} },
        { path: '/paciente/prontuario/:id', name: 'medical-record-patient', component: MedicalRecord, meta: {title: 'Prontuário médico'} },
        // {
        //   path: '/usuarios',
        //   name: 'users',
        //   component: import('@/views/app/users/Index.vue'),
        //   meta: {
        //     title: 'Usuários'
        //   }
        // },
        { path: '/meus-dados', name: 'my-data', component: MyData, meta: {title: 'Meus dados'} },
        { path: '/redefinir-senha', name: 'redefine-password', component: ChangePassword, meta: {title: 'Redefinir senha'} },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: 'login',
      component: () => import('@/views/auth/Index.vue'),
      children: [
        { path: 'login', name: 'login', component: Login, meta: {title: 'Login'} },
        { path: 'recover-password', name: 'recover-password', component: RecoverPassword, meta: {title: 'Recuperar senha'} },
      ]
    }
  ]
})

router.beforeEach((route, from, next) => {
  const publicPages = ['/auth/login', '/auth/recover-password'];
  const authNotRequired = publicPages.includes(route.path);
  const s: any = session()
  document.title = route.meta.title?.toString() || DEFAULT_TITLE

  if (!authNotRequired && !s.isLoggedIn) {
    return next('/auth/login');
  } else if (s.isLoggedIn && authNotRequired) {
    document.title = from.meta.title?.toString() || DEFAULT_TITLE
    return next(from.path);
  } else next();
})
export default router
