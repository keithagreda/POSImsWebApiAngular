import { Routes } from '@angular/router';
import { CashierComponent } from './cashier.component';

export const CashierRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CashierComponent,
      },
    ],
  },
];
