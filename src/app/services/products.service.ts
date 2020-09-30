import { Injectable } from '@angular/core';

export interface Product {
  id:number;
  name:string;
  image:string;
  description:string;
  cost:number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
}
