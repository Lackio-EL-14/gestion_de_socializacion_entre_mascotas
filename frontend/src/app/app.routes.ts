import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  // 1. HOME (Sin layout específico, usa el suyo propio)
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },

  // 2. RUTAS DE AUTENTICACIÓN (Usan el AuthLayout que tiene la tarjeta centrada)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: 'request-reset', loadComponent: () => import('./features/auth/passwordRecover/requestReset/requestReset.component').then(m => m.RequestResetComponent) },
      { path: 'change-password', loadComponent: () => import('./features/auth/passwordRecover/changePassword/changePassword.component').then(m => m.ResetPasswordComponent) },
      // Dentro del children de DashboardLayoutComponent
      { path: 'feed', loadComponent: () => import('./features/feed/feed-home/feed-home.component').then(m => m.FeedHomeComponent) }
    ]
  },

  // 3. RUTAS DEL DASHBOARD (Usan el DashboardLayout que incluye el Sidebar)
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard-owner', loadComponent: () => import('./features/dashboards/dashboard-owner/dashboard-owner.component').then(m => m.DashboardOwnerComponent) },
      { path: 'dashboard-edit-owner', loadComponent: () => import('./features/dashboards/dashboard-edit-owner/dashboard-edit-owner.component').then(m => m.DashboardEditOwnerComponent) },

      // Rutas de mascotas
      { path: 'pets/list-pets', loadComponent: () => import('./features/pets/list-pets/list-pets.component').then(m => m.ListPetsComponent) },
      { path: 'pets/create-pet', loadComponent: () => import('./features/pets/create-pet/create-pet.component').then(m => m.CreatePetComponent) },
      { path: 'pets/edit-pet/:id', loadComponent: () => import('./features/pets/edit-pet/edit-pet.component').then(m => m.EditPetComponent) },
    ]
  },

  // 4. CATCH ALL (Redirigir a Home si no existe)
  { path: '**', redirectTo: '' }
];
