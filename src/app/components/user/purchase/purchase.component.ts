import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product, ProductsService } from 'src/app/services/products.service';
import { UserProfile, UserService } from 'src/app/services/user.service';
import { PopupComponent } from '../../main/popup/popup.component';

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
  user: UserProfile;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isProductValid = true;
    this.purchase = false;
    this.spinner.hide();
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
    });
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
    this.spinner.show();
    this.userService
      .purchaseProduct(this.product.id, this.emiTenure)
      .subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        if (data.id) {
          this.userService.addPurchase(data);
          console.log('purchase success');
          let popup = this.dialog.open(PopupComponent, {
            width: '350px',
            data: {
              msg: 'Purchase Success',
            },
          });
          popup.afterClosed().subscribe((_) => {
            this.router.navigate(['/user/purchases',data.id]);
          });
        } else {
          console.log('purchase failed');
          this.dialog.open(PopupComponent, {
            width: '350px',
            data: {
              msg: 'Purchase Failed',
            },
          });
        }
      });
  }
}
