import { Routes } from '@angular/router';
import { SalesComponent } from './sales.component';

export const SalesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SalesComponent,
      },
    ],
  },
];
