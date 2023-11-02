import {createRouter, createWebHistory} from 'vue-router'
import {session} from "@/stores/session";

const DEFAULT_TITLE: string = 'Hospital Medical Care'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: import('../views/app/Index.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: import('../views/app/dashboard/Index.vue'),
          meta: {
            title: 'Dashboard'
          }
        },
        {
          path: '/unidades',
          name: 'units',
          component: import('../views/app/units/Index.vue'),
          meta: {
            title: 'Unidades'
          }
        },
        {
          path: '/unidades/:id',
          name: 'unit',
          component: import('../views/app/units/Unit.vue'),
          meta: {
            title: 'Unidade'
          }
        },
        {
          path: '/pacientes',
          name: 'patients',
          component: import('../views/app/patients/Index.vue'),
          meta: {
            title: 'Pacientes'
          }
        },
        {
          path: '/unidade/prontuario/:id',
          name: 'medical-record-unit',
          component: import('../views/app/medical_record/Index.vue'),
          meta: {
            title: 'Prontuário médico'
          }
        },
        {
          path: '/paciente/prontuario/:id',
          name: 'medical-record-patient',
          component: import('../views/app/medical_record/Index.vue'),
          meta: {
            title: 'Prontuário médico'
          }
        },
        {
          path: '/usuarios',
          name: 'users',
          component: import('../views/app/users/Index.vue'),
          meta: {
            title: 'Usuários'
          }
        },
        {
          path: '/meus-dados',
          name: 'my-data',
          component: import('../views/app/my_data/Index.vue'),
          meta: {
            title: 'Meus dados'
          }
        },
        {
          path: '/redefinir-senha',
          name: 'redefine-password',
          component: import('../views/app/my_data/ChangePassword.vue'),
          meta: {
            title: 'Redefinir senha'
          }
        },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: '/auth/login',
      component: () => import('../views/auth/Index.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: import('../views/auth/Login.vue'),
          meta: {
            title: 'Login'
          }
        },
        {
          path: 'recover-password',
          name: 'recover-password',
          component: import('../views/auth/RecoverPassword.vue'),
          meta: {
            title: 'Recuperar senha'
          }
        },
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
