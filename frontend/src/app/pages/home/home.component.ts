import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('scrollable_div') elementView !: ElementRef;

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Home | Exclusive');
  }

  // Navigation
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

  // Scroll to Top
  scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
