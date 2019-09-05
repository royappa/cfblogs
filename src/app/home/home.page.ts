import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogEntry } from '../models/cfmodels';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  blogEntries: BlogEntry[];
  CODEFORCES = 'https://codeforces.com';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.blogEntries = [];
    this.http.get('https://us-central1-codeforces-blogs.cloudfunctions.net/getBlogEntries')
      .subscribe(
        (data: any) => { this.blogEntries = data; }
      );
  }

}
