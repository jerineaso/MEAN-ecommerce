import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/layout/footer/footer.component';
import { TopHeaderComponent } from './components/layout/top-header/top-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TopHeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    TopHeaderComponent,
    FooterComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
