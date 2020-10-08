import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { RegisterComponent } from './components/main/register/register.component';
import { LoginComponent } from './components/main/login/login.component';
import { ProductsListComponent } from './components/main/products-list/products-list.component';
import { ProductDetailComponent } from './components/main/product-detail/product-detail.component';
import { PageNotFoundComponent } from './components/main/page-not-found/page-not-found.component';

import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { PurchasesListComponent } from './components/user/purchases-list/purchases-list.component';
import { PurchaseDetailComponent } from './components/user/purchase-detail/purchase-detail.component';
import { PurchaseComponent } from './components/user/purchase/purchase.component';

import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';

import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service';
import { UserNavbarComponent } from './components/user/user-navbar/user-navbar.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserEmicardComponent } from './components/user/user-emicard/user-emicard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsListComponent },
      { path: ':id', component: ProductDetailComponent },
    ],
  },
  {
    path: 'user',
    canActivate: [AuthService],
    component: UserNavbarComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'emi-card', component: UserEmicardComponent },
      {
        path: 'purchases',
        children: [
          { path: '', component: PurchasesListComponent },
          { path: ':id', component: PurchaseDetailComponent },
        ],
      },
      {path:'purchase', component: PurchaseComponent}
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminService],
    component: AdminNavbarComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'products', component: EditProductComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
