import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/data-access/auth.service";
import {catchError, of, tap} from "rxjs";
import {Product} from "../../products/data-access/product.model";
import {ItemBasket} from "./item-basket.model";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService)
  private readonly  path = "http://localhost:3333/v1/api/basket"
  private readonly typeAuthorization = "bearer"

  private readonly _basket = signal<ItemBasket[]>([]);
  public readonly basket = this._basket.asReadonly();
  constructor() { }

  public add(basket : ItemBasket[]){
    return this.http.post<ItemBasket[]>(this.path, basket , {headers: {'Authorization': `${this.typeAuthorization} ${this.authService.token}`}}).pipe(
      catchError((err) => {
        console.log(err)
        return of([]);
      }),
      tap((currentBasket) => this._basket.update(baskets => currentBasket)),
    )
  }

  public get(){
    return this.http.get<ItemBasket[]>(this.path, {headers: {'Authorization': `${this.typeAuthorization} ${this.authService.token}`}}).pipe(
      catchError(err => {
        return of([])
      }),
      tap((currentBasket)=> {
        console.log(currentBasket)
        this._basket.set(currentBasket)
      })
    )
  }
}
