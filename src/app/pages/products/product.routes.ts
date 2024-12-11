import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

export const ProductsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
    ],
  },
];
