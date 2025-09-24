import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'presensi',
        loadComponent: () =>
          import('./presensi/presensi.page').then((m) => m.PresensiPage), // Tab Presensi
      },
      {
        path: 'pengaturan',
        loadComponent: () => import('./pengaturan/pengaturan.page').then((m) => m.PengaturanPage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];





