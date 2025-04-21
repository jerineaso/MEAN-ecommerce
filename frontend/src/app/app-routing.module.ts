import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      // { path: '', component: HomeComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'about', component: AboutComponent },
      // add more inner pages here
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
