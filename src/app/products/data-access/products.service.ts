import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import {AuthService} from "../../auth/data-access/auth.service";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly authService = inject(AuthService)
    private readonly path = "http://localhost:3333/v1/api/products";
    private readonly typeAuthorization = "bearer"

    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path, {headers: {'Authorization': `${this.typeAuthorization} ${this.authService.token}`}}).pipe(
            catchError((error) => {
                return this.http.get<Product[]>("assets/products.json");
            }),
            tap((products) => this._products.set(products)),
        );
    }

    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product, {headers: {'Authorization': `${this.typeAuthorization} ${localStorage.getItem('token')}`}}).pipe(
            catchError((error) => {
              console.log('error', error);
              return of(true);
            }),

            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product, {headers: {'Authorization': `${this.typeAuthorization} ${localStorage.getItem('token')}`}}).pipe(
            catchError((error) => {
              console.error('error', error);
                return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`, {headers: {'Authorization': `${this.typeAuthorization} ${localStorage.getItem('token')}`}}).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }
}
