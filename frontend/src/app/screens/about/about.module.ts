import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { CountUpModule } from 'ngx-countup';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    CountUpModule,
    NgxSkeletonLoaderModule,
    NgbAccordionModule
]
})
export class AboutModule { }
