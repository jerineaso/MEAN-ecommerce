import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  // Initializations
  days       : string = '00';
  hours      : string = '00';
  minutes    : string = '00';
  seconds    : string = '00';
  intervalId : any

  constructor() { }

  ngOnInit(): void {
    this.timerFunction() // Fn to setup the timer
  }

  timerFunction(){
    this.intervalId = setInterval(() => {
      const now = new Date();
      const targetDate = new Date("06/20/2025 00:00:00");
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(this.intervalId);
        return;
      }
      this.days    = this.formatTimetoString(Math.floor(diff / (1000 * 60 * 60 * 24)));
      this.hours   = this.formatTimetoString(Math.floor((diff / (1000 * 60 * 60)) % 24));
      this.minutes = this.formatTimetoString(Math.floor((diff / (1000 * 60)) % 60));
      this.seconds = this.formatTimetoString(Math.floor((diff / 1000) % 60));
    }, 1000);
  }

  formatTimetoString(number : any) {
    const numStr = String(number);
    return numStr.length === 2 ? numStr : "0" + numStr;
  }

  @ViewChild('scrollable_div') elementView !: ElementRef;

  navigate(way : string){
    const el = this.elementView.nativeElement
    if(way === 'toRight'){
      const remainingScroll = el.scrollWidth - el.clientWidth - el.scrollLeft;
      const scrollAmount = Math.min(remainingScroll, 400);
      el.scrollTo({
        left: el.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }else {
      const scrollAmount = Math.min(el.scrollLeft, 400);
      el.scrollTo({
        left: el.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  ngOnDestory(){
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
