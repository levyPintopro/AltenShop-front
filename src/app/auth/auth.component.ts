import {Component, computed, EventEmitter, Output, signal} from '@angular/core';
import {Product} from "../products/data-access/product.model";
import {Button, ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {BrowserModule} from "@angular/platform-browser";
import {CardModule} from "primeng/card";
import {PasswordModule} from "primeng/password";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule, // ✅ Remplace BrowserModule
    FormsModule,  // ✅ Nécessaire pour [(ngModel)]
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  @Output() save = new EventEmitter<any>()
  public readonly editedAuth = signal({email:'', password:''});

  onSave() {
    this.save.emit(this.editedAuth());
  }
}
