import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) { }

  getUsers() {
    // online json fake api 
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }
}
