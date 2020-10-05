import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product, ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit,OnDestroy {
  
  products: Array<Product> = [];
  productsSubscription:Subscription;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
  
}
