import { Routes } from '@angular/router';
import { EntityHistoryComponent } from './entity-history.component';

export const EntityHistoryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EntityHistoryComponent,
      },
    ],
  },
];
