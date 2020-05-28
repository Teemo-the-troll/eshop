import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { VarService } from "../var.service";
import { Product, Rating } from "../data";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private vars: VarService
  ) {}
  id: string;
  
  product: Product;
  avgRating: Number;
  parameters: Object;
  
  getProduct(id) {
    let url = "/rest-api/api/products/" + id;
    return this.httpClient.get<Product>(url, {
      headers: this.vars.apiKey,
      observe: "response",
    });
  }

  prepParams(){
    let object = this.parameters;
    const map = new Map();
    Object.keys(object).forEach(key => {map.set(key, object[key])});
    return map;
  }

  get params(){
    return this.prepParams();
  }

  calculateRating(){
    let percentage = 0;
    let ratings: Rating[]  = this.product.ratings;
    let i = 0;
    for (i; i < ratings.length; i++) {
      percentage += ratings[i].percent
    }
    percentage /= i
    this.avgRating = percentage
  }

  ngOnInit(): void {
    var testStr = this.router.url;
    var splitStr = testStr.split("/");
    this.id = splitStr[splitStr.length - 1];
    this.getProduct(this.id).subscribe(
      (data) => {
        this.product = data.body;
        this.parameters = data.body.parameters;

        this.calculateRating()
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

class ProductParams {
  constructor() {


  }
}
