import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProduct, AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  pid: number;
  product: AdminProduct;
  productForm: FormGroup;
  formSubmitted: boolean;
  productLoaded: boolean;
  productValid: boolean;

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.createProductForm();
    this.formSubmitted = false;
    this.pid = 0;
    this.getProduct();
  }

  getProduct() {
    if (this.pid != 0) {
      this.productLoaded = false;
      this.adminService.getProduct(this.pid).subscribe((product) => {
        if (product.id) {
          this.productForm.setValue(product);
          this.productLoaded = true;
        } else {
          this.productValid = false;
        }
      });
    } else {
      this.productForm.reset();
      this.productLoaded = true;
      this.productValid = true;
    }
  }

  createProductForm(): void {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      originalPrice: ['', [Validators.required]],
      profitPercent: ['', [Validators.required]],
      cost: ['', [Validators.required]],
    });
  }

  submit() {
    console.log(this.productForm);
    if (this.productForm.valid) {
      this.product = this.productForm.value;
      if (!this.formSubmitted) {
        this.formSubmitted = true;
        console.log(this.product);
        this.adminService.saveProduct(this.product).subscribe((res) => {
          if (res.success) {
            alert(res.message);
            this.productForm.reset();
            this.pid = 0;
          } else {
            alert(res.message);
          }
          this.formSubmitted = false;
        });
      }
    }
  }
}
