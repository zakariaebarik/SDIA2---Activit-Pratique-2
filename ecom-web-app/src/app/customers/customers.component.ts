import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers : any;
  constructor(private http : HttpClient,
              private router : Router) {
  }

  ngOnInit() {
    this.http.get("http://localhost:8080/CUSTOMER-SERVICE/customers").subscribe({
      next : (data) => {
        this.customers = data;
      },
      error : (err) => {}
    })
    }

  getOrders(c: any) {
    this.router.navigateByUrl("/orders/"+c.id);

  }
}
