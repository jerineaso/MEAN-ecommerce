import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/layout/header/header.component';
import { RouterModule } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductListingComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductListingComponent
  ],
  providers: [
  ]
})

export class SharedModule { }
