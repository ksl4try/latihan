import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'karyawan-list',
    loadComponent: () =>
      import('./pages/karyawan-list/karyawan-list.page').then(
        (m) => m.KaryawanListPage
      ),
  },
  {
    path: 'karyawan-detail/:id',
    loadComponent: () =>
      import('./pages/karyawan-detail/karyawan-detail.page').then(
        (m) => m.KaryawanDetailPage
      ),
  },

  {
    path: 'karyawan-form',
    loadComponent: () =>
      import('./pages/karyawan-form/karyawan-form.page').then(
        (m) => m.KaryawanFormPage
      ),
  },
  {
    path: 'karyawan-form/:id',
    loadComponent: () =>
      import('./pages/karyawan-form/karyawan-form.page').then(
        (m) => m.KaryawanFormPage
      ),
  },
  {
    path: 'log-presensi',
    loadComponent: () => import('./pages/log-presensi/log-presensi.page').then( m => m.LogPresensiPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
];
