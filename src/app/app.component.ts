import {
  Component, signal,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import {AuthComponent} from "./auth/auth.component";
import {CommonModule} from "@angular/common";
import {AuthService} from "./auth/data-access/auth.service";
import {ProductFormComponent} from "./products/ui/product-form/product-form.component";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {tap} from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, AuthComponent, CommonModule, ProductFormComponent],
})
export class AppComponent {

  constructor(private authService: AuthService) {
  }
  title = "ALTEN SHOP";
  _isConnected = signal<boolean>(false);


  async ngOnInit() {
    this.authService.isConnected()
    // Écoute les changements de connexion si isConnected() est un Observable
    this.authService.isConnected$?.subscribe((status) => {
      this._isConnected.set(status);
    });
  }

  async login(login: any) {
    console.log(login.email);

    this.authService.login(login.email, login.password).subscribe((response) => {
      // Une fois le login réussi, on met à jour _isConnected
      this._isConnected.set(true);
    }, (error) => {
      console.error("Erreur de connexion :", error);
    });
  }
  onSave(){}
}



