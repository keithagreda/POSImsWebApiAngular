import { Routes } from '@angular/router';
import { ProductCategoryComponent } from './product-category.component';

export const ProductCategoryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductCategoryComponent,
      },
    ],
  },
];
