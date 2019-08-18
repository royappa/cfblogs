import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  blogEntries: any[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.blogEntries = [];
    const ids = [];
    this.http.get('https://codeforces.com/api/recentActions?maxCount=100').subscribe(
      data => { 
          data['result'].forEach(e => {
            const id = e.blogEntry.id;
            const title = e.blogEntry.title;
            if (!ids.includes(id)) {
              this.blogEntries.push({id, title});
              ids.push(id);
            }
          });
        }
    );


  }
}
