import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PipeModule } from './pipe/pipe.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ShortenContentPipe } from './shorten-content.pipe';
import { FormsModule } from '@angular/forms';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ReactiveFormsModule} from '@angular/forms';
import { WatchedMoviesComponent } from './watched-movies/watched-movies.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WatchlistComponent,
    NavigationBarComponent,
    MovieComponent,
    MovieDetailComponent,
    ShortenContentPipe,
    CommentFormComponent,
    WatchedMoviesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
