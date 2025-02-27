import {
  Component, inject,
} from "@angular/core";
import { MenuItem } from "primeng/api";
  import { PanelMenuModule } from 'primeng/panelmenu';
import {AuthService} from "../../../auth/data-access/auth.service";

  @Component({
    selector: "app-panel-menu",
    standalone: true,
    imports: [PanelMenuModule],
    template: `<p-panelMenu [model]="items" styleClass="w-full" />`
  })
  export class PanelMenuComponent {

    public readonly items: MenuItem[] = [
        {
            label: 'Accueil',
            icon: 'pi pi-home',
            routerLink: ['/home']
        },
        {
            label: 'Produits',
            icon: 'pi pi-barcode',
            routerLink: ['/products/list']
        },
        {
          label: 'Contact',
          icon: 'pi pi-send',
          routerLink: ['/products/list']
        }
    ]
  }
