import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  cost: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Array<Product> = [];
  constructor(private http: HttpClient) {
    this.fetchProducts();
  }
  getProduct(pid: number) {
    console.log(pid);
    let product = this.products.find((product) => product.id == pid);
    console.log(product);
  }
  getProducts(): Observable<Array<Product>> {
    let url = 'http://localhost:8080/product';
    return this.http.get<Array<Product>>(url);
  }
  fetchProducts() {
    let url = 'http://localhost:8080/product';
    this.http.get<Array<Product>>(url).subscribe((data) => {
      this.products = data;
    });
  }
}
