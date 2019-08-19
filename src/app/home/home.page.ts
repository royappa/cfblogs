import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CFRecentActionsHttp, RecentAction } from '../models/cfmodels';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  recentActions: RecentAction[];
  CODEFORCES = 'https://codeforces.com';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.recentActions = [];
    const ids = [];
    this.http.get('https://codeforces.com/api/recentActions?maxCount=100').subscribe(
      (data: CFRecentActionsHttp) => {
        data.result.forEach(ra => {
          const id = ra.blogEntry.id;
          if (!ids.includes(id)) {
            ra.blogEntry.title = ra.blogEntry.title.replace(/<[^>]*>?/gm, '');
            this.recentActions.push(ra);
            ids.push(id);
          }
        });
      }
    );
  }
}
