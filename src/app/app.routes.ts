import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contratos', pathMatch: 'full' },
  { path: 'contratos', loadComponent: () => import('./features/contratos/contratos-list/contratos-list.component').then(m => m.ContratosListComponent) },
  { path: 'contratos/nuevo', loadComponent: () => import('./features/contratos/contratos-form/contratos-form.component').then(m => m.ContratosFormComponent) },
  { path: 'contratos/editar/:id', loadComponent: () => import('./features/contratos/contratos-form/contratos-form.component').then(m => m.ContratosFormComponent) },
  { path: 'contratos/detalle/:id', loadComponent: () => import('./features/contratos/contratos-detail/contratos-detail.component').then(m => m.ContratosDetailComponent) },
  
  { path: 'contratistas', loadComponent: () => import('./features/contratistas/contratistas-list/contratistas-list.component').then(m => m.ContratistasListComponent) },
  { path: 'contratistas/nuevo', loadComponent: () => import('./features/contratistas/contratistas-form/contratistas-form.component').then(m => m.ContratistasFormComponent) },
  { path: 'contratistas/editar/:id', loadComponent: () => import('./features/contratistas/contratistas-form/contratistas-form.component').then(m => m.ContratistasFormComponent) },
  { path: 'contratistas/detalle/:id', loadComponent: () => import('./features/contratistas/contratistas-detail/contratistas-detail.component').then(m => m.ContratistasDetailComponent) },

  { path: 'personal', loadComponent: () => import('./features/personal/personal-list/personal-list.component').then(m => m.PersonalListComponent) },
  { path: 'personal/nuevo', loadComponent: () => import('./features/personal/personal-form/personal-form.component').then(m => m.PersonalFormComponent) },
  { path: 'personal/editar/:id', loadComponent: () => import('./features/personal/personal-form/personal-form.component').then(m => m.PersonalFormComponent) },
  { path: 'personal/detalle/:id', loadComponent: () => import('./features/personal/personal-detail/personal-detail.component').then(m => m.PersonalDetailComponent) },

  { path: 'transporte', loadComponent: () => import('./features/transporte/transporte-list/transporte-list.component').then(m => m.TransporteListComponent) },
  { path: 'transporte/nuevo', loadComponent: () => import('./features/transporte/transporte-form/transporte-form.component').then(m => m.TransporteFormComponent) },
  { path: 'transporte/editar/:id', loadComponent: () => import('./features/transporte/transporte-form/transporte-form.component').then(m => m.TransporteFormComponent) },
  { path: 'transporte/detalle/:id', loadComponent: () => import('./features/transporte/transporte-detail/transporte-detail.component').then(m => m.TransporteDetailComponent) },

  { path: 'maquinaria', loadComponent: () => import('./features/maquinaria/maquinaria-list/maquinaria-list.component').then(m => m.MaquinariaListComponent) },
  { path: 'maquinaria/nuevo', loadComponent: () => import('./features/maquinaria/maquinaria-form/maquinaria-form.component').then(m => m.MaquinariaFormComponent) },
  { path: 'maquinaria/editar/:id', loadComponent: () => import('./features/maquinaria/maquinaria-form/maquinaria-form.component').then(m => m.MaquinariaFormComponent) },
  { path: 'maquinaria/detalle/:id', loadComponent: () => import('./features/maquinaria/maquinaria-detail/maquinaria-detail.component').then(m => m.MaquinariaDetailComponent) },
];
