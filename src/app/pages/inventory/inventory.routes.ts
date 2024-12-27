import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';

export const InventoryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InventoryComponent,
      },
    ],
  },
];
