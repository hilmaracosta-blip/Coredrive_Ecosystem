import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
  { path: 'contato', loadComponent: () => import('./features/contato/contato').then(m => m.ContatoComponent) },
  { path: 'dashboard/cliente', loadComponent: () => import('./features/dashboard/cliente/dashboard-cliente/dashboard-cliente').then(m => m.DashboardClienteComponent) },
  { path: 'dashboard/montadora', loadComponent: () => import('./features/dashboard/montadora/dashboard-montadora/dashboard-montadora').then(m => m.DashboardMontadoraComponent) },
  { path: 'dashboard/autorizada', loadComponent: () => import('./features/dashboard/autorizada/dashboard-autorizada/dashboard-autorizada').then(m => m.DashboardAuthorizedComponent) },
 { path: 'dashboard/recicladora', loadComponent: () => import('./features/dashboard/recicladora/dashboard-recicladora/dashboard-recicladora').then(m => m.DashboardReciclagemComponent) }

];