import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        // Ini sudah benar, path-nya adalah 'dashboard'
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('./tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        // UBAH INI: Arahkan ke 'dashboard' sebagai halaman default untuk tabs
        redirectTo: '/tabs/dashboard', 
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    // UBAH INI JUGA: Arahkan ke 'dashboard' sebagai halaman default untuk aplikasi
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
  },
];