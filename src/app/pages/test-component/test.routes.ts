import { Routes } from '@angular/router';
import { TestComponentComponent } from './test-component.component';

export const TestRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TestComponentComponent,
      },
    ],
  },
];
