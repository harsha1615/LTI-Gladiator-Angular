import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(private productsService : ProductsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
  let pid;
  this.route.params.subscribe((params)=>{
    pid=+params['id'];
    this.productsService.getProduct(pid);
    //this.product=this.productsService.getProduct(pid);
    //console.log(this.product)
  })
  }

}
