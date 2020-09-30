import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../../../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  newProduct:boolean;
  product:Product;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let param;
    this.route.params.subscribe( (params:Params) => param = params['id']);
    if(isNaN(param)){
      if(param == "new"){
        this.newProduct = true;
      }else{
        this.router.navigate(['page-not-found']);
      }
    }else{

    }
  }

}
