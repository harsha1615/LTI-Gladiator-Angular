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
  payemi: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let pid = +this.route.snapshot.params['id'];
    this.purchase = this.userService.getPurchase(pid);
  }

  emiDue():boolean{
    let purchaseDate = Date.parse(this.purchase.dateTime.toString());
    let presentDate = Date.now();
    let month = 1000*60*60*24*30;
    if(this.purchase.emisPaid == this.purchase.emiTenure){
      return false;
    }
    if(presentDate > purchaseDate+(month*this.purchase.emisPaid)){
      return true;
    }
    return false;
  }

  lateFee():number{
    let purchaseDate = Date.parse(this.purchase.dateTime.toString());
    let presentDate = Date.now();
    let day = 1000*60*60*24;
    let month = day*30;
    let lateDays = Math.floor((presentDate - purchaseDate+(month*this.purchase.emisPaid))/day);
    let lateFeePerDay = 10;
    if(lateDays<=30){
      return 0;
    }
    return lateDays*lateFeePerDay;
  }

  payEmi(){
    this.payemi = true;
  }

  cancelPayEmi(){
    this.payemi = false;
  }

  confirmPayEmi() {
    this.userService.payEmi(this.purchase.id).subscribe((data) => {
      if (data.id) {
        this.userService.updatePurchase(data);
        this.purchase = data;
        this.userService.fetchProfile();
        alert("payment success");
        this.payemi = false;
      } else {
        let res: any = data;
        console.log(res.message);
        alert(res.message);
      }
    });
  }
}
