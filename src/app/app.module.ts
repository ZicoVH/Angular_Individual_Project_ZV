import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ShortenContentPipe } from './shorten-content.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WatchlistComponent,
    NavigationBarComponent,
    MovieComponent,
    MovieDetailComponent,
    ShortenContentPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
