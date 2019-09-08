import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogEntry } from '../models/cfmodels';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  blogEntries$: Observable<BlogEntry[]>;
  CODEFORCES = 'https://codeforces.com';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.blogEntries$ = this.http.get<BlogEntry[]>('https://us-central1-codeforces-blogs.cloudfunctions.net/getBlogEntries');
  }

}
