import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VarService {
  apiKey = new  HttpHeaders();
  public url = "";

  constructor() { 
    this.apiKey = this.apiKey.set("access-token","7f3c2bbf-c440-4794-a09b-9a2b865e326a");
    this.url = "http://kodytek.cz:8080/rest-api/"
  }
}
