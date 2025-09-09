import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './@shared/shared.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormsModule } from "@angular/forms";
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    AboutComponent,
    SignUpComponent,
    LoginComponent,
    ContactComponent,
    WishListComponent,
    CartComponent,
    CheckOutComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    // Plugins
    NgbModule,
    FormsModule
],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
