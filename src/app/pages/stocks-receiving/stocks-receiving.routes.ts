import { Routes } from '@angular/router';
import { StocksReceivingComponent } from './stocks-receiving.component';

export const StocksReceivingRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StocksReceivingComponent,
      },
    ],
  },
];
