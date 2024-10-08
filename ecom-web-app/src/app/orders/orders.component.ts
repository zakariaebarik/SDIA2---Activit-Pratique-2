import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  customerId! : number;
  orders : any;
  constructor(private http : HttpClient,
              private router : Router,
              private route : ActivatedRoute) {
    this.customerId  = this.route.snapshot.params["customerId"];
  }

  ngOnInit() {
    this.http.get("http://localhost:8080/BILLING-SERVICE/bills/search/byCustomerId?projection=fullBill&customerId="+this.customerId).subscribe({
      next : (data) => {
        this.orders = data;
      },
      error : (err) => {}
    })
  }

  getBillDetails(o: any) {
    this.router.navigateByUrl("/billDetails/"+o.id);
  }
}
