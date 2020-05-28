import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { VarService } from "src/app/var.service";
import { Category, Product } from "src/app/data";
import { Router } from "@angular/router";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    public vars: VarService,
    private router: Router
  ) {
    this.vars = vars;
    this.httpClient = httpClient;
  }
  listOfCategories = [];
  listOfProducts = [];

  routeToProduct(id) {
    this.router.navigate(["/detail", id]);
  }

  getCategories() {
    let url = "/rest-api/api/categories";
    return this.httpClient.get<Category[]>(url, {
      headers: this.vars.apiKey,
      observe: "response",
    });
  }

  get categories() {
    return this.listOfCategories;
  }

  get products() {
    return this.listOfProducts;
  }

  getProduct(id: number) {
    let url = "/rest-api/api/products/" + id;
    return this.httpClient.get<Product>(url, {
      headers: this.vars.apiKey,
      observe: "response",
    });
  }

  getCategory(id: number) {
    let url = "/rest-api/api/categories/" + id;
    this.httpClient
      .get<Category>(url, {
        headers: this.vars.apiKey,
        observe: "response",
      })
      .subscribe(
        (data) => {
          let tmpList = [];
          for (let i = 0; i < data.body.products.length; i++) {
            tmpList.push(data.body.products[i]);
          }
          console.log(tmpList);
          this.listOfProducts = tmpList;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.getCategories().subscribe(
      (data) => {
        let tmpList = [];
        for (let i = 0; i < data.body.length; i++) {
          tmpList.push(data.body[i]);
        }
        this.listOfCategories = tmpList;
      },
      (error) => {
        console.log(error);
      }
    );

    this.getCategory(1);
  }
}
