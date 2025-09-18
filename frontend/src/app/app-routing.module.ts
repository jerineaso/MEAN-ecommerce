import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', loadChildren: () => import('./screens/about/about.module').then(m => m.AboutModule) },
      { path: 'contact', loadChildren: () => import('./screens/contact/contact.module').then(m => m.ContactModule) },
      { path: 'wishlist', loadChildren: () => import('./screens/wishlist/wishlist.module').then(m => m.WishlistModule) },
      { path: 'cart', loadChildren: () => import('./screens/cart/cart.module').then(m => m.CartModule) },
      { path: 'auth', loadChildren: () => import('./screens/auth/auth.module').then(m => m.AuthModule) },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
