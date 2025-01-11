import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';
//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {
  EntityHistoryService,
  InventoryService,
  ProductCategoryService,
  ProductService,
  SalesService,
  StocksService,
  StorageLocationService,
  UserAuthService,
} from './services/nswag/nswag.service';
import { CartService } from './services/cart.service';
import { LoadingService } from './services/loading.service';
import { CustomInterceptor } from './services/interceptor/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    ProductService,
    ProductCategoryService,
    StocksService,
    StorageLocationService,
    SalesService,
    CartService,
    InventoryService,
    LoadingService,
    UserAuthService,
    EntityHistoryService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TablerIconsModule.pick(TablerIcons),
      NgScrollbarModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
  ],
};
