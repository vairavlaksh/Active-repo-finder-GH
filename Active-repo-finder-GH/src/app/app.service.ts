import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  fetchReposfromGH(token: string) {
    const url = `https://api.github.com/orgs/kaplantestprep/repos?access_token=${token}`;
    return this.http.get(url);
  }
}
