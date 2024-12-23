import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/product.routes').then(
            (m) => m.ProductsRoutes
          ),
      },

      {
        path: 'cashier',
        loadChildren: () =>
          import('./pages/cashier/cashier.routes').then((m) => m.CashierRoutes),
      },
      {
        path: 'test',
        loadChildren: () =>
          import('./pages/test-component/test.routes').then(
            (m) => m.TestRoutes
          ),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./pages/sales/sales.routes').then((m) => m.SalesRoutes),
      },
      {
        path: 'stocks-receiving',
        loadChildren: () =>
          import('./pages/stocks-receiving/stocks-receiving.routes').then(
            (m) => m.StocksReceivingRoutes
          ),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
