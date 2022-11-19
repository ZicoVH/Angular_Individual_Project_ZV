import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { WatchedMoviesComponent } from './watched-movies/watched-movies.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'watchlist',component: WatchlistComponent},
  {path: 'movie/:id',component: MovieDetailComponent},
  {path: 'watched', component: WatchedMoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
