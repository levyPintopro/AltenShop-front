import {Component, computed, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {DialogModule} from "primeng/dialog";
import {PrimeTemplate} from "primeng/api";
import {ProductFormComponent} from "../../../products/ui/product-form/product-form.component";
import {BasketService} from "../../data-access/basket.service";
import {ProductsService} from "../../../products/data-access/products.service";

@Component({
  selector: 'app-basket-list',
  standalone: true,
    imports: [
        Button,
        DataViewModule,
        DialogModule,
        PrimeTemplate,
        ProductFormComponent
    ],
  templateUrl: './basket-list.component.html',
  styleUrl: './basket-list.component.css'
})
export class BasketListComponent implements OnInit {

  private readonly basketService = inject(BasketService)
  private readonly productService = inject(ProductsService)

  basket = this.basketService.basket
  products = this.productService.products

  basketProducts = computed(() =>
    this.basket().map(item => ({
      ...this.products().find(p => p.id === item.productId), // Associe le produit
      quantity: item.quantity // Ajoute la quantité du panier
    })).filter(p => p.id) // Évite les valeurs `undefined`
  );

  ngOnInit(){
    this.basketService.get().subscribe()
    this.productService.get().subscribe()
  }

  delete(produit:any){
    this.basket().filter(itemBasket => itemBasket !== produit.id)
  }

}
