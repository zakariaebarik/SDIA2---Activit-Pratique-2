import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-bill-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './bill-details.component.html',
  styleUrl: './bill-details.component.css'
})
export class BillDetailsComponent {
  billId! : number;
  productItems : any;
  constructor(private http : HttpClient,
              private router : Router,
              private route : ActivatedRoute) {
    this.billId  = this.route.snapshot.params["billId"];
  }

  ngOnInit() {
    this.http.get("http://localhost:8080/BILLING-SERVICE/productItems/search/byBillId?projection=fullProductItem&billId="+this.billId).subscribe({
      next : (data) => {
        this.productItems = data;
      },
      error : (err) => {}
    })
  }

}
