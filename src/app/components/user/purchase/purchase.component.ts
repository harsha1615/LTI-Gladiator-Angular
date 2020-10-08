import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService } from 'src/app/services/products.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  productId: number;
  product: Product;
  isProductValid: boolean;
  emiTenure: number;
  purchase: boolean;
  user:UserProfile;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isProductValid = true;
    this.purchase = false;
    this.route.queryParams.subscribe((params) => {
      this.productId = params['pid'];
      this.product = this.productsService.getProduct(this.productId);
      if (this.product) {
        this.isProductValid = true;
      } else {
        this.isProductValid = false;
      }
    });
    this.userService.getProfile().subscribe((data) => {
      this.user = data;
    })
  }

  monthlyEmi(): number {
    if (this.emiTenure) {
      return Math.round((100 * this.product.cost) / this.emiTenure) / 100;
    }
  }

  doPurchase() {
    this.purchase = true;
  }

  cancelPurchase() {
    this.purchase = false;
  }

  confirmPurchase() {
    this.userService
      .purchaseProduct(this.product.id, this.emiTenure)
      .subscribe((data) => {
        if (data.success) {
          this.userService.fetchPurchases();
          console.log('purchase success');
          alert('purchase success');
          this.router.navigate(['/user/purchases']);
        } else {
          console.log('purchase failed');
          alert('purchase failed');
        }
      });
  }
}
