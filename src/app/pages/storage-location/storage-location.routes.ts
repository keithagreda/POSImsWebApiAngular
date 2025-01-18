import { Routes } from '@angular/router';
import { StorageLocationComponent } from './storage-location.component';

export const StorageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StorageLocationComponent,
      },
    ],
  },
];
