import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {
  promotions: any;
  nextUrl: any;
  token: any;
  showMore: boolean;

  constructor(
    private auth: AuthService,
    private promo: PromotionService
  ) { }

  ngOnInit() {
    this.auth.token$.subscribe((res: any) => {      
      this.token = res;
      this.promo.get({ url: 'promotions', token: this.token}).subscribe((promos: any) => {
        this.promotions = promos.data;
        this.nextUrl =(promos.next_page_url) ? promos.next_page_url.split("/").pop() : null;        
      });      
    });
  }

  loadMore() {
    if (this.nextUrl) {
      this.promo.get({ url: this.nextUrl, token: this.token}).subscribe((promos: any) => {
        this.promotions = this.promotions.concat(promos.data);
        console.log("P R O M", this.promotions);
        this.nextUrl = (promos.next_page_url) ? promos.next_page_url.split("/").pop() : null;
      }); 
    }
  }

  trackByFn(index, item) {
    return index;  
  }

  logout() {
    this.auth.logout();
  }
}
