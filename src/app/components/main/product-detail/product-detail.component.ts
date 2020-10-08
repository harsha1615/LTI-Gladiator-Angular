import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let pid;
    this.route.params.subscribe((params) => {
      pid = +params['id'];
      this.product = this.productsService.getProduct(pid);
    });
  }

  buy() {
    this.router.navigate(['/user/purchase'], {
      queryParams: { pid: this.product.id },
    });
  }

}
