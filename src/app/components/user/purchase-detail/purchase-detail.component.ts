import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Purchase, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css'],
})
export class PurchaseDetailComponent implements OnInit {
  purchase: Purchase;
  lateFee: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let pid = +this.route.snapshot.params['id'];
    this.purchase = this.userService.getPurchase(pid);
    this.lateFee = 0;
  }

  payEmi() {
    this.userService.payEmi(this.purchase.id).subscribe((data) => {
      if (data.id) {
        this.userService.updatePurchase(data);
        this.purchase = data;
        this.userService.fetchProfile();
      } else {
        let res: any = data;
        console.log(res.message);
        alert(res.message);
      }
    });
  }
}
