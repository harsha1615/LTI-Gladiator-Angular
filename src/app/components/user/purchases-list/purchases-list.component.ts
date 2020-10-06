import { Component, OnInit } from '@angular/core';
import { Purchase, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css'],
})
export class PurchasesListComponent implements OnInit {
  purchases: Array<Purchase>;
  constructor(private purchasesService: UserService) {}

  ngOnInit(): void {
    this.purchasesService.getPurchases().subscribe((data) => {
      this.purchases = data;
    });
  }
}
