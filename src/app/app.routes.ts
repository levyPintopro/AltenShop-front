import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import {authGuard} from "./guards/auth/auth.guard";
import {AuthComponent} from "./auth/auth.component";
import {BasketListComponent} from "./basket/features/basket-list/basket-list.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
   canActivate: [authGuard],

  },
  {
    path: "products",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: "basket",
    component: BasketListComponent,
    canActivate: [authGuard],
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
