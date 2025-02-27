import {
  Component, inject, signal,
} from "@angular/core";
import {Router, RouterModule} from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import {AuthComponent} from "./auth/auth.component";
import {CommonModule} from "@angular/common";
import {AuthService} from "./auth/data-access/auth.service";
import {ProductFormComponent} from "./products/ui/product-form/product-form.component";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {tap} from "rxjs";
import {BasketService} from "./basket/data-access/basket.service";
import {ButtonModule} from "primeng/button";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, AuthComponent, CommonModule, ProductFormComponent, ButtonModule],
})
export class AppComponent {

  private readonly authService = inject(AuthService)
  private readonly basketService = inject(BasketService)
  readonly router = inject(Router)
  title = "ALTEN SHOP";
  isConnected = this.authService.userIsConnected
  basket = this.basketService.basket
  isAdmin = this.authService.userIsAdmin


  async ngOnInit() {

    this.authService.isConnected()
    this.basketService.get().subscribe()
  }

  async login(login: any) {
    this.authService.login(login.email, login.password).subscribe();
  }

  async logout() {
    this.authService.logout()
    await this.router.navigate(['/home'])
  }
}



