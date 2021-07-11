import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  fetchReposfromGH(token: string, pageNumber: number) {
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    const options = { headers: headers };
    const url = `https://api.github.com/search/repositories?q=user:KaplanTestPrep&per_page=100&page=${pageNumber}`;
    return this.http.get(url, options);
  }
}
