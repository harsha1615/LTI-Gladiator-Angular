import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private _products$: Observable<Array<Product>>;
  private _products: BehaviorSubject<Array<Product>>;

  constructor(private http: HttpClient) {
    this._products = new BehaviorSubject<Array<Product>>([]);
    this._products$ = this._products.asObservable();
    this.fetchProducts();
  }

  getProduct(pid: number): Product {
    let products = this._products.value;
    return products.find((product) => product.id == pid);
  }

  getProducts(): Observable<Array<Product>> {
    return this._products$;
  }

  fetchProducts() {
    let url = 'http://localhost:8080/product';
    this.http.get<Array<Product>>(url).subscribe((data) => {
      this._products.next(data);
    });
  }
  
}
