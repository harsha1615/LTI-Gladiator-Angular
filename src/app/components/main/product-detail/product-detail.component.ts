import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Product, ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  check: boolean = false;
  isUserLoggedIn: boolean;
  isbuyclicked: boolean;
  emiTenure: number;
  constructor(
    private _router: Router,
    private authService: AuthService,
    private userService: UserService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let pid;
    this.route.params.subscribe((params) => {
      pid = +params['id'];
      this.product = this.productsService.getProduct(pid);
      this.check = true;
    });
    this.authService.isLoggedIn$.subscribe((data) => {
      this.isUserLoggedIn = data;
    });
  }
  buy() {
    this.isbuyclicked = true;
  }
  loginUser() {
    this._router.navigate(['/login']);
  }
  confirmPurchase() {
    this.userService
      .purchaseProduct(this.product.id, this.emiTenure)
      .subscribe((data) => {
        if (data.success) {
          console.log('purchase success');
          alert('purchase success');
          this.userService.fetchPurchases();
        } else {
          console.log('purchase failed');
          alert('purchase failed');
        }
      });
  }
}
