import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LimitDescriptionPipe } from './pipes/limit-description.pipe';
import { LimitTitlePipe } from './pipes/limit-title.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { FavoritesModalComponent } from './components/favorites-modal/favorites-modal.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LimitDescriptionPipe,
    LimitTitlePipe,
    FooterComponent,
    ProductModalComponent,
    CartModalComponent,
    FavoritesModalComponent,
    FormModalComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
