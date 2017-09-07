import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { MainAppComponent } from './main-app/main-app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StarsComponent } from './stars/stars.component';
import { ProductService } from './shared/product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FilterPipe } from './pipe/filter.pipe';
import { WebSocketService } from './shared/web-socket.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    SearchComponent,
    MainAppComponent,
    CarouselComponent,
    ProductListComponent,
    StarsComponent,
    ProductDetailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    WebSocketService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
