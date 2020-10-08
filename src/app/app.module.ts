import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { HomeComponent } from './components/main/home/home.component';
import { RegisterComponent } from './components/main/register/register.component';
import { LoginComponent } from './components/main/login/login.component';
import { ProductsListComponent } from './components/main/products-list/products-list.component';
import { ProductDetailComponent } from './components/main/product-detail/product-detail.component';

import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { PurchasesListComponent } from './components/user/purchases-list/purchases-list.component';
import { PurchaseDetailComponent } from './components/user/purchase-detail/purchase-detail.component';

import { EditProductComponent } from './components/admin/edit-product/edit-product.component';

import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { PageNotFoundComponent } from './components/main/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserNavbarComponent } from './components/user/user-navbar/user-navbar.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { PurchaseComponent } from './components/user/purchase/purchase.component';
import { PopupComponent } from './components/main/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { UserEmicardComponent } from './components/user/user-emicard/user-emicard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProductsListComponent,
    ProductDetailComponent,

    DashboardComponent,
    PurchasesListComponent,
    PurchaseDetailComponent,

    EditProductComponent,
    UsersListComponent,
    UserDetailsComponent,
    PageNotFoundComponent,
    AdminDashboardComponent,
    UserNavbarComponent,
    AdminNavbarComponent,
    UserProfileComponent,
    PurchaseComponent,
    PopupComponent,
    UserEmicardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
